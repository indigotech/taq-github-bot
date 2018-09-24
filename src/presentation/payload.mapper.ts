import { DeveloperInput } from '@domain';

export const PayloadMapper = {
  mapToDeveloper(payload): DeveloperInput {
    const devData = payload.sender;
    return { githubId: devData.id, name: devData.login };
  },
};
