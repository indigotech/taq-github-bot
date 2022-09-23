import { WebhookPayloadWithRepository } from 'probot';

interface GithubUser {
  id: number;
  login: string;
  type: string;
}

interface GithubIssue {
  id: number;
  number: number;
}

export interface Payload extends WebhookPayloadWithRepository {
  requester?: GithubUser;
  member?: GithubUser;
  sender?: GithubUser;
  issue?: GithubIssue;
}
