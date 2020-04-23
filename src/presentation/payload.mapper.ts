import { DeveloperInput } from '@domain/developer.model';

export const PayloadMapper = {
  mapToDeveloper(payload): DeveloperInput {
    const developer = payload.requester || payload.member || payload.sender;
    return developer && { developerId: developer.id, name: developer.login };
  },
};
