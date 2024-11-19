import type {
  CallbackEvent,
  CallbackEventType,
  Destination,
  Message,
} from "./types.ts";

export type MessageResponse = {
  destination: Destination;
  to: string;
  message: Message;
};

export class BotContext<T extends CallbackEvent> {
  constructor(public readonly e: T) {}

  newResponse(
    destination: Destination,
    to: string,
    message: Message,
  ): MessageResponse {
    return { destination, to, message };
  }

  send(
    destination: Destination,
    to: string,
    message: Message,
  ): MessageResponse {
    return this.newResponse(destination, to, message);
  }

  reply(message: Message): MessageResponse {
    return this.newResponse(this.by(), this.id(), message);
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
