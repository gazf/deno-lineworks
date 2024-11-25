/** @see {@link https://developers.worksmobile.com/jp/docs/bot-actionobject} */
export type Action =
  | PostbackAction
  | MessageAction
  | URIAction
  | CameraAction
  | CameraRollAction
  | LocationAction
  | CopyAction;

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-actionobject#postback} */
export type PostbackAction = {
  type: "postback";
  label: string;
  data: string;
  displayText: string;
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-actionobject#message} */
export type MessageAction = {
  type: "message";
  label: string;
  text: string;
  postback?: string;
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-actionobject#uri} */
export type URIAction = {
  type: "uri";
  label: string;
  uri: string;
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-actionobject#camera} */
export type CameraAction = {
  type: "camera";
  label: string;
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-actionobject#cameraroll} */
export type CameraRollAction = {
  type: "camera";
  label: string;
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-actionobject#location} */
export type LocationAction = {
  type: "location";
  label: string;
};

/** @see {@link https://developers.worksmobile.com/jp/docs/bot-actionobject#copy} */
export type CopyAction = {
  type: "copy";
  label: string;
  copyText: string;
};
