export type * from "./types/auth.ts";
export type * from "./types/bot.ts";
export type * from "./types/bot-action.ts";
export type * from "./types/bot-message.ts";
export type * from "./types/bot-callback-event.ts";
export type * from "./types/calender.ts";

export type AuthEnv = {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly serviceAccount: string;
  readonly privateKey: string;
};
