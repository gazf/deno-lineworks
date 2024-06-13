/** {@link https://developers.worksmobile.com/jp/docs/bot-callback} */
export type CallbackEvent =
  MessageCallbackEvent |
  PostbackCallbackEvent |
  JoinCallbackEvent |
  LeaveCallbackEvent |
  JoinedCallbackEvent |
  LeftCallbackEvent;

export type CallbackEventType = CallbackEvent['type'];

export type MessageCallbackEvent = 
  TextMessageCallbackEvent |
  LocationMessageCallbackEvent |
  StickerMessageCallbackEvent |
  ImageMessageCallbackEvent |
  FileMessageCallbackEvent;

export type MessageCallbackEventBase = {
  type: 'message'
  source: {
    userId: string
    channelId?: string
    domainId: number 
  }
  issuedTime: string
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-message#message-event-text} */
export type TextMessageCallbackEvent = MessageCallbackEventBase & {
  content: {
    type: 'text'
    text: string
    postback: string
  }
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-message#message-event-location} */
export type LocationMessageCallbackEvent = MessageCallbackEventBase & {
  content: {
    type: 'location'
    address: string
    latitude: number
    longitude: number
  }
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-message#message-event-sticker} */
export type StickerMessageCallbackEvent = MessageCallbackEventBase & {
  content: {
    type: 'sticker'
    packageId: string
    stickerId: string
  }
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-message#message-event-image} */
export type ImageMessageCallbackEvent = MessageCallbackEventBase & {
  content: {
    type: 'image'
    fileId: string
  }
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-message#message-event-file} */
export type FileMessageCallbackEvent = MessageCallbackEventBase & {
  content: {
    type: 'file'
    fileId: string
  }
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-postback} */
export type PostbackCallbackEvent = {
  type: 'postback',
  source: {
    userId: string,
    channelId: string,
    domainId: number
  },
  issuedTime: string
  data: string
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-join} */
export type JoinCallbackEvent = {
  type: 'join',
  source: {
    channelId: string,
    domainId: number
  },
  issuedTime: string
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-leave} */
export type LeaveCallbackEvent = {
  type: 'leave',
  source: {
    channelId: string,
    domainId: number
  },
  issuedTime: string
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-joined} */
export type JoinedCallbackEvent = {
  type: 'joined',
  source: {
    channelId: string,
    domainId: number
  },
  issuedTime: string,
  members: string[]
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-left} */
export type LeftCallbackEvent = {
  type: 'left'
  source: {
    channelId: string
    domainId: number
  },
  issuedTime: string
  members: string[]
};
