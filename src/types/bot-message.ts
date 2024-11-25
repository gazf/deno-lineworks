import type { Action } from "./bot-action.ts";

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-api#bot-message} */
export type Destination = "users" | "channels";

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-content} */
export type Message =
  | TextMessage
  | StickerMessage
  | ImageMessage
  | FlexMessage;

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-text} */
export type TextMessage = {
  content: {
    type: "text";
    text: string;
    quickReply?: QuickReply;
  };
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-sticker} */
export type StickerMessage = {
  content: {
    type: "sticker";
    packageId: number;
    stickerId: number;
    quickReply?: QuickReply;
  };
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-image} */
export type ImageMessage = {
  content: {
    type: "image";
    previwImageUrl?: `https://${string}`;
    originalContentUrl?: `https://${string}`;
    fileId?: string;
    quickReply?: QuickReply;
  };
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-flex} */
export type FlexMessage = {
  content: {
    type: "flex";
    altText: string;
    contents: FlexBubble;
  };
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-flex-bubble} */
export type FlexBubble = {
  type: "bubble";
  size?: "nano" | "micro" | "kilo" | "mega" | "giga";
  direction?: "ltr" | "rtl";
  header?: FlexBox;
  hero?: FlexBox | FlexImage;
  body?: FlexBox;
  footer?: FlexBox;
  styles?: {
    backgroundColor?: string;
    separator?: string;
    separatorColor?: string;
  };
  action?: Action;
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-flex-carousel} */
export type FlexCarousel = {
  type: "carousel";
  contents: FlexBubble[];
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-flex-box} */
export type FlexBox = {
  type: "box";
  layout: "horizontal" | "vertical" | "baseline";
  contents: (
    | FlexBox
    | FlexButton
    | FlexImage
    | FlexIcon
    | FlexText
    | FlexSeparator
    | FlexFiller
  )[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?:
    | string
    | "none"
    | "light"
    | "normal"
    | "medium"
    | "semi-bold"
    | "bold";
  cornerRadius?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  width?: string;
  height?: string;
  flex?: number;
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  margin?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  paddingAll?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  paddingTop?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  paddingBottom?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  paddingStart?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  paddingEnd?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  position?: "relative" | "absolute";
  offsetTop?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  offsetBottom?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  offsetStart?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  offsetEnd?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  action?: Action;
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-flex-button} */
export type FlexButton = {
  type: "button";
  action: Action;
  flex?: number;
  margin?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  position?: "relative" | "absolute";
  offsetTop?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  offsetBottom?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  offsetStart?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  offsetEnd?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  height?: "sm" | "md";
  style?: "primary" | "secondary" | "link";
  color?: string;
  gravity?: "top" | "bottom" | "center";
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-flex-image} */
export type FlexImage = {
  type: "image";
  url: `https://${string}`;
  flex?: number;
  margin?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  position?: "relative" | "absolute";
  offsetTop?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  offsetBottom?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  offsetStart?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  offsetEnd?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  align?: string;
  gravity?: "top" | "bottom" | "center";
  size?:
    | "xxs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "xxl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  aspectRatio?: string;
  aspectMode?: string;
  action?: Action;
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-flex-icon} */
export type FlexIcon = {
  type: "icon";
  url: `https://${string}`;
  margin?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  position?: "relative" | "absolute";
  offsetTop?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  offsetBottom?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  offsetStart?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  offsetEnd?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  size?:
    | "xxs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "xxl"
    | "3xl"
    | "4xl"
    | "5xl";
  aspectRatio?: string;
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-flex-text} */
export type FlexText = {
  type: "text";
  text?: string;
  contents?: FlexSpan[];
  flex?: number;
  margin?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  position?: "relative" | "absolute";
  offsetTop?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  offsetBottom?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  offsetStart?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  offsetEnd?: string | "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  size?:
    | "xxs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "xxl"
    | "3xl"
    | "4xl"
    | "5xl";
  align?: string;
  gravity?: "top" | "bottom" | "center";
  wrap?: boolean;
  maxLines?: number;
  weight?: "regular" | "bold";
  color?: string;
  action?: Action;
  style?: "normal" | "italic";
  decoration?: "none" | "underline" | "line-through";
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-flex-span} */
export type FlexSpan = {
  type: "span";
  text: string;
  color?: string;
  size?:
    | "xxs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "xxl"
    | "3xl"
    | "4xl"
    | "5xl";
  weight?: "regular" | "bold";
  style?: "normal" | "italic";
  decoration?: "none" | "underline" | "line-through";
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-flex-separator} */
export type FlexSeparator = {
  type: "separator";
  margin?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  color?: string;
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-flex-filler} */
export type FlexFiller = {
  type: "filler";
  flex?: number;
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-quickreply} */
export type QuickReply = {
  items: QuickReplyItem[];
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-quickreply#quickreply-request} */
export type QuickReplyItem = {
  imageUrl?: `https://${string}`;
  imageResourceId?: string;
  action: Action;
};
