import { DeveloperInput } from '@domain';

export const PayloadMapper = {
  mapToDeveloper(payload): DeveloperInput {
    const developer = payload.requester || payload.sender;
    return developer && { developerId: developer.id, name: developer.login };
  },
};
