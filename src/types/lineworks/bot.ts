/** @see {@link https://developers.worksmobile.com/jp/docs/bot-update-patch#Request-Body} */
export type BotUpdate = {
  botName: string;
  photoUrl: string;
  description: string;
  administrators: string[];
  subadministrators: string[];
  allowDomains: number[];
  enableCallback: boolean;
  callbackEvents: ("text" | "location" | "sticker" | "image" | "file")[];
  callbackUrl: string;
  enableGroupJoin: boolean;
  defaultRichmenuId: string;
};
