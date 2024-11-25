export type BotUpdate = {
  botName: string;
  photoUrl: `https://${string}`;
  description: string;
  administrators: string[];
  subadministrators: string[];
  allowDomains: number[];
  enableCallback: boolean;
  callbackEvents: ("text" | "location" | "sticker" | "image" | "file")[];
  callbackUrl: `https://${string}`;
  enableGroupJoin: boolean;
  defaultRichmenuId: string;
};