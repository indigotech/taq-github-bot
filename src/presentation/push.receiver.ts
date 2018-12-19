import { Context } from 'probot';
import { Service } from 'typedi';
import { Receiver } from './receiver';

@Service()
export class PushReceiver extends Receiver {

  onReceive = async (context: Context) => {
    const ref = context.payload.ref;
    const added = context.payload.head_commit.added;
    const modified = context.payload.head_commit.modified;
    const removed = context.payload.head_commit.removed;
    console.log(ref, added, modified, removed);
  }
}
