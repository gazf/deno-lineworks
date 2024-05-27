import { Bot, InferCallbackEvent } from "./bot.ts";
import type { CallbackEventType, Message } from "./types.ts";

export class Context<E extends CallbackEventType> {
  constructor(
    private readonly bot: Bot,
    public readonly e: InferCallbackEvent<E>
  ) {}

  send(destination: 'users' | 'channels', to: string, message: Message) {
    this.bot.send(destination, to, message);
  }

  reply(message: Message) {
    const destination = this.e.source.channelId === undefined ? 'users' : 'channels';
    const to = this.e.source.channelId ?? this.e.source.userId;
    return this.bot.send(destination, to, message);
  }
}
