export type * from "./types/lineworks/auth.ts";
export type * from "./types/lineworks/bot-action.ts";
export type * from "./types/lineworks/bot-callback-event.ts";
export type * from "./types/lineworks/bot-message.ts";
export type * from "./types/lineworks/bot.ts";
export type * from "./types/lineworks/calender.ts";
export type * from "./types/lineworks/language-code.ts";
export type * from "./types/lineworks/scope.ts";

export type AuthEnv = {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly serviceAccount: string;
  readonly privateKey: string;
};
