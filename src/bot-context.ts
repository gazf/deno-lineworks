import type { SendMessageInterface } from "./bot.ts";
import type { CallbackEvent, CallbackEventType, Destination, Message } from "./types.ts";

export class BotContext<T extends CallbackEvent> {
  constructor(
    private readonly app: { send: SendMessageInterface },
    public readonly e: T,
  ) {}

  send(
    destination: Destination,
    to: string,
    message: Message,
  ): Promise<Response> {
    return this.app.send(destination, to, message);
  }

  reply(message: Message): Promise<Response> {
    return this.app.send(this.by(), this.id(), message);
  }

  by(): Destination {
    return this.e.source.channelId === undefined ? "users" : "channels";
  }

  id(): string {
    return this.e.type === "message"
      ? this.e.source.channelId ?? this.e.source.userId
      : this.e.source.channelId;
  }

  type(): CallbackEventType {
    return this.e.type;
  }

  timestamp(): string {
    return this.e.issuedTime;
  }
}
