export type * from './types/bot-message.ts'
export type * from './types/bot-callback-event.ts'

export type * from './types/auth.ts'

export type EventResponse = {
  events: [{
    eventComponents: Event[]
    organizerCalendarId: string
  }]
};

export type Event = {
  eventId: string
  createdTime: {
    dateTime: string
    timeZone: string
  }
  updatedTime: {
    dateTime: string
    timeZone: string
  }
  summary: string
  description: string
  location: string
  map: {
    type: string
    geo: string
  }
  mapUrl: {
    mapUrl: string
    imageId: string
  }
  categoryId: string
  organizer: {
    email: string
    displayName: string
  }
  start: {
    date: string
    dateTime: string
    timeZone: string
  }
  end: {
    date: string
    dateTime: string
    timeZone: string
  }
  recurrence: string[]
  recurringEventId: string
  transparency: 'OPAQUE' | 'TRANSPARENT'
  visibility: 'PUBLIC' | 'PRIVATE'
  sequence: number
  attendees: [{
    id: string
    email: string
    displayName: string
    partstat: 'NEEDS-ACCTION' | 'ACCEPTED' | 'DECLINED' | 'TENTATIVE'
    isResource: boolean
    isOptional: boolean
    resourceValue: string
  }]
  videoMeeting: {
    url: string
    resourceId: string
  }
  reminders: [{
    method: 'DISPLAY' | 'EMAIL'
    trigger: string
  }]
  attachments: [{
    fileUrl: string
    fileName: string
    fileSize: number
  }]
  viewUrl: string
};