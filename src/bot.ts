import type { CallbackEvent, CallbackEventType, Message } from "./types.ts";
import { BOT_ENDPOINT } from "./endpoints.ts";
import { encodeBase64 } from "std/encoding/base64.ts";
import { AuthInterface } from "./auth.ts";
import { Context } from "./context.ts";

interface CallbackEventHandler<T extends CallbackEventType> {
  (c: Context<T>): Promise<void>
}

export type InferCallbackEvent<T extends CallbackEventType> = Extract<CallbackEvent, {content: {type: T}}>;

export class Bot {
  private readonly id: string;
  private readonly secret: string;
  private readonly auth: AuthInterface;
  private handlers: {
    [K in CallbackEventType]?: CallbackEventHandler<K>
  };

  constructor(id: string, secret: string, auth: AuthInterface) {
    this.id = id;
    this.secret = secret;
    this.auth = auth;
    this.handlers = {};
  }

  async send(
    destination: 'users' | 'channels',
    to: string,
    message: Message
  ) {
    const token = await this.auth.fetchAccessToken();
    const url = `${BOT_ENDPOINT}${this.id}/${destination}/${to}/messages`;
    return fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(message)
    });
  }

  on<T extends CallbackEventType>(type: T, handler: CallbackEventHandler<T>) {
    // deno-lint-ignore no-explicit-any
    this.handlers[type] = handler as CallbackEventHandler<any>;
  }

  private dispatch<
    T extends CallbackEventType,
    E extends InferCallbackEvent<T>>(type: T, e: E) 
  {  
    const handler = this.handlers[type];
    if (handler !== undefined) 
      return handler(new Context<T>(this, e));
  }

  // deno-lint-ignore no-explicit-any  no-unused-vars
  readonly fetch = async (request: Request, ...args: any): Promise<Response> => {
    if (request.method !== 'POST')
      return new Response('error', {status: 405});

    const contentTypeHeader = request.headers.get('Content-Type');
    if (contentTypeHeader !== 'application/json') 
      return new Response('error', {status: 400});

    const botIdHeader = request.headers.get('X-WORKS-BotId');
    if (botIdHeader === null)
      return new Response('error', {status: 400});

    const signatureHeader = request.headers.get('X-WORKS-Signature');
    if (signatureHeader === null)
      return new Response('error', {status: 400});

    if (botIdHeader !== this.id)
      return new Response('error', {status: 400});

    const requestBody = await (new Response(request.body).text());
    
    const isValidRequest = await this.isValidSignature(signatureHeader, requestBody);
    if (!isValidRequest)
      return new Response('error', {status: 401});

    const event = JSON.parse(requestBody) as CallbackEvent;

    // https://developers.worksmobile.com/jp/docs/bot-callback#callback-flow
    // Need to get a quick response back.
    const _= this.dispatch(event.content.type, event);

    return new Response('ok', {status: 200});
  };

  private async isValidSignature(signatureHeader: string, requestBody: string) {
    const encoder = new TextEncoder();
    const keyBuffer = encoder.encode(this.secret);
    const key = crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'HMAC', hash: 'SHA-256' },
      true,
      ['sign']
    );
  
    const bodyBuffer = encoder.encode(requestBody);
    const hmac = await crypto.subtle.sign('HMAC', await key, bodyBuffer.buffer);
    const signature = encodeBase64(new Uint8Array(hmac));
  
    return signature === signatureHeader;
  }
}
