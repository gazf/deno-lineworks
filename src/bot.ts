import { encodeBase64 } from "std/encoding/base64.ts";
import type {
  CallbackEvent,
  CallbackEventType,
  Destination,
  Message,
  MessageCallbackEvent,
} from "./types.ts";
import { BOT_ENDPOINT } from "./endpoints.ts";
import { AuthInterface } from "./auth.ts";
import { Context } from "./context.ts";

type CallbackEventHandler<T extends CallbackEvent> = (
  c: Context<T>,
) => Promise<void> | void;

type InferCallbackEvent<T extends CallbackEventType> = T extends "message"
  ? MessageCallbackEvent
  : Extract<CallbackEvent, { type: T }>;

export type SendInterface = (
  destination: Destination,
  to: string,
  message: Message,
) => Promise<Response>;

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

  send: SendInterface = async (
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
      const ctx = new Context(this, e);
      // deno-lint-ignore no-explicit-any
      return handler(ctx as any);
    }
  }

  readonly fetch = async (
    request: Request,
    // deno-lint-ignore no-explicit-any  no-unused-vars
    ...args: any
  ): Promise<Response> => {
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

    const isValidRequest = await this.isValidSignature(
      signatureHeader,
      requestBody,
    );
    if (!isValidRequest) {
      return new Response("error", { status: 401 });
    }

    const event = JSON.parse(requestBody) as CallbackEvent;

    // https://developers.worksmobile.com/jp/docs/bot-callback#callback-flow
    // Need to get a quick response back.
    const _ = this.dispatch(event);

    return new Response("ok", { status: 200 });
  };

  private async isValidSignature(signatureHeader: string, requestBody: string) {
    const encoder = new TextEncoder();
    const keyBuffer = encoder.encode(this.secret);
    const key = crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "HMAC", hash: "SHA-256" },
      true,
      ["sign"],
    );

    const bodyBuffer = encoder.encode(requestBody);
    const hmac = await crypto.subtle.sign("HMAC", await key, bodyBuffer.buffer);
    const signature = encodeBase64(new Uint8Array(hmac));

    return signature === signatureHeader;
  }
}
