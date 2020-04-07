import { Context } from 'probot';
import { Inject } from 'typedi';
import { GithubEventSender } from './events-sender.service';

export abstract class Receiver {
  onReceive: (context: Context) => void;
  @Inject() protected readonly eventsSender: GithubEventSender;
}
