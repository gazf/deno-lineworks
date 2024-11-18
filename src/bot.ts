import type {
  CallbackEvent,
  CallbackEventType,
  Destination,
  Message,
  MessageCallbackEvent,
} from "./types.ts";
import { BOT_ENDPOINT } from "./endpoints.ts";
import type { AuthInterface } from "./auth.ts";
import { BotContext } from "./bot-context.ts";
import { encodeBase64 } from "./base64.ts";

type CallbackEventHandler<T extends CallbackEvent> = (
  c: BotContext<T>,
) => Promise<void> | void;

type InferCallbackEvent<T extends CallbackEventType> = T extends "message"
  ? MessageCallbackEvent
  : Extract<CallbackEvent, { type: T }>;

export type SendMessageInterface = (
  destination: Destination,
  to: string,
  message: Message,
) => Promise<Response>;

const createSignature = async (secret: string, body: string) => {
  const encoder = new TextEncoder();
  const keyBuffer = encoder.encode(secret);
  const key = crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign"],
  );

  const bodyBuffer = encoder.encode(body);
  const hmac = await crypto.subtle.sign("HMAC", await key, bodyBuffer.buffer);
  return encodeBase64(hmac);
};

export class Bot {
  private handlers: {
    [K in CallbackEventType]?: CallbackEventHandler<InferCallbackEvent<K>>;
  };

  constructor(
    private readonly id: string,
    private readonly secret: string,
    private readonly auth: AuthInterface,
  ) {
    this.handlers = {};
  }

  /**
   * `.send()` allows you to send a message from Bot.
   * @example
   * bot.send("users", "sam@corp", {
   *   ...
   * });
   */
  send: SendMessageInterface = async (
    destination: Destination,
    to: string,
    message: Message,
  ) => {
    const token = await this.auth.fetchAccessToken();
    const url = `${BOT_ENDPOINT}${this.id}/${destination}/${to}/messages`;
    return fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(message),
    });
  };

  /**
   * `.on()` allows you to register a callback handler.
   * @example
   * bot.on("message", async c => {
   *   await c.reply(...);
   * });
   */
  on<T extends CallbackEventType>(
    type: T,
    handler: CallbackEventHandler<InferCallbackEvent<T>>,
  ) {
    // deno-lint-ignore no-explicit-any
    this.handlers[type] = handler as any;
  }

  private dispatch<T extends CallbackEvent>(e: T) {
    const handler = this.handlers[e.type];
    if (handler !== undefined) {
      const ctx = new BotContext(this, e);
      // deno-lint-ignore no-explicit-any
      return handler(ctx as any);
    }
  }

  /**
   * `.fetch()` will be entry point of your app.
   *
   * @example // use Hono
   * const app = new Hono();
   * const bot = new Bot();
   * app.mount("/callback", bot.fetch);
   * Deno.serve(app.fetch);
   */
  fetch: (request: Request) => Promise<Response> = async (request) => {
    if (request.method !== "POST") {
      return new Response("error", { status: 405 });
    }

    const contentTypeHeader = request.headers.get("Content-Type");
    if (contentTypeHeader !== "application/json") {
      return new Response("error", { status: 400 });
    }

    const botIdHeader = request.headers.get("X-WORKS-BotId");
    if (botIdHeader === null) {
      return new Response("error", { status: 400 });
    }

    const signatureHeader = request.headers.get("X-WORKS-Signature");
    if (signatureHeader === null) {
      return new Response("error", { status: 400 });
    }

    if (botIdHeader !== this.id) {
      return new Response("error", { status: 400 });
    }

    const requestBody = await request.text();
    const signature = await createSignature(this.secret, requestBody);
    if (signatureHeader !== signature) {
      return new Response("error", { status: 401 });
    }

    const event = JSON.parse(requestBody) as CallbackEvent;

    // https://developers.worksmobile.com/jp/docs/bot-callback#callback-flow
    // Need to get a quick response back.
    const _ = this.dispatch(event);

    return new Response("ok", { status: 200 });
  };
}
