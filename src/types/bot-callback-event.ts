/** {@link https://developers.worksmobile.com/jp/docs/bot-callback} */
export type CallbackEvent = 
  TextMessageCallbackEvent |
  LocationMessageCallbackEvent |
  StickerMessageCallbackEvent |
  ImageMessageCallbackEvent |
  FileMessageCallbackEvent

export type CallbackEventType = CallbackEvent['content']['type'];

export type CallbackSource = {
  userId: string
  channelId?: string
  domainId: string 
};

export type MessageCallbackEvent = {
  type: 'message'
  source: CallbackSource
  issuedTime: string
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-message#message-event-text} */
export type TextMessageCallbackEvent = MessageCallbackEvent & {
  content: {
    type: 'text'
    text: string
    postback: string
  }
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-message#message-event-location} */
export type LocationMessageCallbackEvent = MessageCallbackEvent & {
  content: {
    type: 'location'
    address: string
    latitude: number
    longitude: number
  }
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-message#message-event-sticker} */
export type StickerMessageCallbackEvent = MessageCallbackEvent & {
  content: {
    type: 'sticker'
    packageId: string
    stickerId: string
  }
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-message#message-event-image} */
export type ImageMessageCallbackEvent = MessageCallbackEvent & {
  content: {
    type: 'image'
    fileId: string
  }
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-message#message-event-file} */
export type FileMessageCallbackEvent = MessageCallbackEvent & {
  content: {
    type: 'file'
    fileId: string
  }
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-postback} */
export type PostbackEvent = {
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
export type JoinEvent = {
  type: 'join',
  source: {
    channelId: string,
    domainId: number
  },
  issuedTime: string
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-leave} */
export type LeaveEvent = {
  type: 'leave',
  source: {
    channelId: string,
    domainId: number
  },
  issuedTime: string
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-joined} */
export type JoinedEvent = {
  type: 'joined',
  source: {
    channelId: string,
    domainId: number
  },
  issuedTime: string,
  members: string[]
};

/** {@link https://developers.worksmobile.com/jp/docs/bot-callback-left} */
export type LeftEvent = {
  type: 'left',
  source: {
    channelId: string,
    domainId: number
  },
  issuedTime: string,
  members: string[]
};
