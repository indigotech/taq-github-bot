import { DeveloperInput } from '@domain';

export const PayloadMapper = {
  mapToDeveloper(payload): DeveloperInput {
    return payload.sender && { developerId: payload.sender.id, name: payload.sender.login };
  },
  mapToPushEvent(payload) {
    return {
      ref: payload.ref,
      ...payload.head_commit ? {
        added: payload.head_commit.added,
        modified: payload.head_commit.modified,
        removed: payload.head_commit.removed,
      } : undefined,
    };
  },
};
