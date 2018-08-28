export enum EventType {
  CreateComment,
  CreateIssue,
}

export interface Issue {
  title: string;
  body: string;
}

export interface Event {
  type: EventType;
  body?: string;
  issue?: Issue;
}
