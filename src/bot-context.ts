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
  constructor(public readonly event: T) {}

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
    return this.event.source.channelId === undefined ? "users" : "channels";
  }

  id(): string {
    return this.event.type === "message"
      ? this.event.source.channelId ?? this.event.source.userId
      : this.event.source.channelId;
  }

  type(): CallbackEventType {
    return this.event.type;
  }

  timestamp(): string {
    return this.event.issuedTime;
  }
}
