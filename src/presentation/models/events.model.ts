export enum EventType {
  CreateComment,
  CreateIssue,
  CreateFirstIssue,
}

export interface EventData {
  title?: string;
  body: string;
}

export interface Event {
  type: EventType;
  data: EventData;
}
