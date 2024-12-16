/** @see {@link https://developers.worksmobile.com/jp/docs/calendar-personals-user-list#CalendarPersonal} */
export type CalendarParsonalUserList = {
  calendarPersonals: {
    calendarId: string;
    calendarName: string;
    isShowOnLNBList: boolean;
    displayOrder: number;
    resourceLocation: number;
  }[];
  responseMetaData: {
    nextCursor: string;
  };
};

/** @see {@link(https://developers.worksmobile.com/jp/docs/calendar-default-event-user-list#Response)} */
export type EventResponse = {
  events: [{
    eventComponents: Event[];
    organizerCalendarId: string;
  }];
};

/** @see {@link(https://developers.worksmobile.com/jp/docs/calendar-default-event-user-list#Event)} */
export type Event = {
  eventId: string;
  createdTime: {
    dateTime: string;
    timeZone: string;
  };
  updatedTime: {
    dateTime: string;
    timeZone: string;
  };
  summary: string;
  description: string;
  location: string;
  map: {
    type: string;
    geo: string;
  };
  mapUrl: {
    mapUrl: string;
    imageId: string;
  };
  categoryId: string;
  organizer: {
    email: string;
    displayName: string;
  };
  start: {
    date: string;
    dateTime: string;
    timeZone: string;
  };
  end: {
    date: string;
    dateTime: string;
    timeZone: string;
  };
  recurrence: string[];
  recurringEventId: string;
  transparency: "OPAQUE" | "TRANSPARENT";
  visibility: "PUBLIC" | "PRIVATE";
  sequence: number;
  attendees: [{
    id: string;
    email: string;
    displayName: string;
    partstat: "NEEDS-ACCTION" | "ACCEPTED" | "DECLINED" | "TENTATIVE";
    isResource: boolean;
    isOptional: boolean;
    resourceValue: string;
  }];
  videoMeeting: {
    url: string;
    resourceId: string;
  };
  reminders: [{
    method: "DISPLAY" | "EMAIL";
    trigger: string;
  }];
  attachments: [{
    fileUrl: string;
    fileName: string;
    fileSize: number;
  }];
  viewUrl: string;
};
