import type { Action } from "./bot-action.ts";
import type { LanguageCode } from "./language-code.ts";

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
    i18nTexts?: {
      language: LanguageCode;
      text: string;
    }[];
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
    previwImageUrl?: string;
    originalContentUrl?: string;
    fileId?: string;
    quickReply?: QuickReply;
  };
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-file} */
export type FileMessage = {
  content: {
    type: "file";
    originalContentUrl?: string;
    fileId?: string;
  };
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-link} */
export type LinkMessage = {
  content: {
    type: "link";
    contentText: string;
    linkText: string;
    link: string;
    i18nContentTexts?: {
      language: LanguageCode;
      contentText: string;
    }[];
    i18nLinkTexts?: {
      language: LanguageCode;
      linkText: string;
    }[];
  };
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-button} */
export type ButtonTemplate = {
  content: {
    type: "button_template";
    contentText: string;
    i18nContentTexts?: {
      language: LanguageCode;
      contentText: string;
    }[];
    actions: Action[];
  };
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-list} */
export type ListTemplate = {
  content: {
    type: "list_template";
    coverData?: {
      backgroundImageUrl?: string;
      backgroundFileId?: string;
      title?: string;
      subtitle?: string;
      i18nBackgroundImageUrls?: {
        language: LanguageCode;
        backgroundImageUrl: string;
      }[];
      i18nBackgroundFileIds?: {
        language: LanguageCode;
        backgroundFileId: string;
      }[];
      i18nTitles?: {
        language: LanguageCode;
        title: string;
      }[];
      i18nSubtitles?: {
        language: LanguageCode;
        subtitle: string;
      }[];
    };
    elements: {
      title?: string;
      subtitle?: string;
      originalContentUrl?: string;
      fileId?: string;
      action: Action;
      i18nTitles?: {
        language: LanguageCode;
        title: string;
      }[];
      i18nSubtitles?: {
        language: LanguageCode;
        subtitle: string;
      }[];
      i18nOriginalContentUrls?: {
        language: LanguageCode;
        originalContentUrl: string;
      }[];
      i18nFileIds?: {
        language: LanguageCode;
        fileId: string;
      }[];
    }[];
    actions: Action[][];
  };
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-carousel} */
export type CarouselTemplate = {
  content: {
    type: "carousel";
    imageAspectRatio?: "rectangle" | "square";
    imageSize?: "cover" | "contain";
    columns: {
      originalContentUrl?: string;
      fileId?: string;
      title?: string;
      text: string;
      defaultAction?: Action;
      actions: Action[];
      i18nOriginalContentUrls?: {
        language: LanguageCode;
        originalContentUrl: string;
      }[];
      i18nFileIds?: {
        language: LanguageCode;
        fileId: string;
      }[];
    }[];
  };
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-send-imagecarousel} */
export type ImageCarouselTemplate = {
  content: {
    type: "image_carousel";
    columns: {
      originalContentUrl?: string;
      fileId?: string;
      action: Action;
      i18nOriginalContentUrls?: {
        language: LanguageCode;
        originalContentUrl: string;
      }[];
      i18nFileIds?: {
        language: LanguageCode;
        fileId: string;
      }[];
    }[];
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
  imageUrl?: string;
  imageResourceId?: string;
  action: Action;
};
