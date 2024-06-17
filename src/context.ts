import { SendInterface } from "./bot.ts";
import type { CallbackEvent, Destination, Message } from "./types.ts";

export class Context<T extends CallbackEvent> {
  constructor(
    private readonly app: { send: SendInterface },
    public readonly e: T,
  ) {}

  send(destination: Destination, to: string, message: Message) {
    return this.app.send(destination, to, message);
  }

  reply(message: Message) {
    const { destination, to } = this.getDestination();
    return this.app.send(destination, to, message);
  }

  private getDestination() {
    const destination: Destination = this.e.source.channelId === undefined
      ? "users"
      : "channels";
    const to: string = this.e.type === "message"
      ? this.e.source.channelId ?? this.e.source.userId
      : this.e.source.channelId;
    return { destination, to };
  }
}
