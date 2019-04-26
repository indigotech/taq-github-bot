import { DeveloperInput } from '@domain';

export const PayloadMapper = {
  mapToDeveloper(payload): DeveloperInput {
    return payload.sender && { developerId: payload.sender.id, name: payload.sender.login };
  },
};
