import type {
  FileMessage,
  ImageMessage,
  LinkMessage,
  StickerMessage,
  TextMessage,
} from "./types.ts";

interface BuildTextMessageInterface {
  (text: string, options?: TextMessage["content"]): TextMessage;
}

interface BuildStickerMessageInterface {
  (
    packageId: number,
    stickerId: number,
    options?: StickerMessage["content"],
  ): StickerMessage;
}

interface BuildImageMessageInterface {
  (
    previwImageUrl: string,
    originalContentUrl: string,
    options?: ImageMessage["content"],
  ): ImageMessage;
  (fileId: string, options?: ImageMessage): ImageMessage;
}

interface BuildFileMessageInterface {
  (arg: { originalContentUrl: string; fileId?: undefined }): FileMessage;
  (arg: { originalContentUrl?: undefined; fileId: string }): FileMessage;
}

interface BuildLinkMessageInterface {
  (
    contentText: string,
    linkText: string,
    link: string,
    options?: LinkMessage["content"],
  ): LinkMessage;
}

export class BotMessageBuilder {
  static mention = (id: string): string => `<m userId="${id}">`;

  static text: BuildTextMessageInterface = (
    text: string,
    options?: TextMessage["content"],
  ): TextMessage => {
    return {
      content: {
        type: "text",
        text,
        ...options,
      },
    };
  };

  static sticker: BuildStickerMessageInterface = (
    packageId: number,
    stickerId: number,
    options?: StickerMessage["content"],
  ) => {
    return {
      content: {
        type: "sticker",
        packageId,
        stickerId,
        ...options,
      },
    };
  };

  static image: BuildImageMessageInterface = (
    arg1: string,
    arg2?: string | ImageMessage,
    arg3?: ImageMessage["content"],
  ): ImageMessage => {
    return typeof arg2 === "string"
      ? {
        content: {
          type: "image",
          previwImageUrl: arg1,
          originalContentUrl: arg2,
          ...arg3,
        },
      }
      : {
        content: {
          type: "image",
          fileId: arg1,
          ...arg2,
        },
      };
  };

  static file: BuildFileMessageInterface = (
    arg: { originalContentUrl?: string; fileId?: string },
  ): FileMessage => {
    if (arg.originalContentUrl !== undefined) {
      return {
        content: {
          type: "file",
          originalContentUrl: arg.originalContentUrl,
        },
      };
    } else {
      return {
        content: {
          type: "file",
          fileId: arg.fileId,
        },
      };
    }
  };

  static link: BuildLinkMessageInterface = (
    contentText: string,
    linkText: string,
    link: string,
    options?: LinkMessage["content"],
  ): LinkMessage => {
    return {
      content: {
        type: "link",
        contentText,
        linkText,
        link,
        ...options,
      },
    };
  };
}
