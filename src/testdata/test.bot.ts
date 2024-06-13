import type {
  TextMessageCallbackEvent,
  LocationMessageCallbackEvent,
  StickerMessageCallbackEvent,
  ImageMessageCallbackEvent,
  FileMessageCallbackEvent,
  PostbackCallbackEvent,
  JoinCallbackEvent,
  LeaveCallbackEvent,
  JoinedCallbackEvent,
  LeftCallbackEvent
} from '../mod.ts';

export const mockTextMessageCallbackEvent: TextMessageCallbackEvent = {
  type: 'message',
  source: {
    userId: '',
    channelId: '',
    domainId: 0
  },
  content: {
    type: 'text',
    text: 'TEXT',
    postback: ''
  },
  issuedTime: ''
};

export const mockLocationMessageCallbackEvent: LocationMessageCallbackEvent = {
  type: 'message',
  source: {
    userId: '',
    channelId: '',
    domainId: 0
  },
  content: {
    type: 'location',
    address: '',
    latitude: 0,
    longitude: 0
  },
  issuedTime: ''
};

export const mockStickerMessageCallbackEvent: StickerMessageCallbackEvent = {
  type: 'message',
  source: {
    userId: '',
    channelId: '',
    domainId: 0
  },
  content: {
    type: 'sticker',
    packageId: '',
    stickerId: ''
  },
  issuedTime: ''
};

export const mockImageMessageCallbackEvent: ImageMessageCallbackEvent = {
  type: 'message',
  source: {
    userId: '',
    channelId: '',
    domainId: 0
  },
  content: {
    type: 'image',
    fileId: ''
  },
  issuedTime: ''
};

export const mockFileMessageCallbackEvent: FileMessageCallbackEvent = {
  type: 'message',
  source: {
    userId: '',
    channelId: '',
    domainId: 0
  },
  content: {
    type: 'file',
    fileId: ''
  },
  issuedTime: ''
};

export const mockPostbackCallbackEvent: PostbackCallbackEvent = {
  type: 'postback',
  source: {
    userId: '',
    channelId: '',
    domainId: 0
  },
  issuedTime: '',
  data: ''
};

export const mockJoinCallbackEvent: JoinCallbackEvent = {
  type: 'join',
  source: {
    channelId: '',
    domainId: 0
  },
  issuedTime: ''
};

export const mockLeaveCallbackEvent: LeaveCallbackEvent = {
  type: 'leave',
  source: {
    channelId: '',
    domainId: 0
  },
  issuedTime: ''
};

export const mockJoinedCallbackEvent: JoinedCallbackEvent = {
  type: 'joined',
  source: {
    channelId: '',
    domainId: 0
  },
  issuedTime: '',
  members: ['','','']
};

export const mockLeftCallbackEvent: LeftCallbackEvent = {
  type: 'left',
  source: {
    channelId: '',
    domainId: 0
  },
  issuedTime: '',
  members: ['','','']
};
