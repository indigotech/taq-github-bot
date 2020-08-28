import { DeveloperInput } from '@domain/developer.model';

interface GithubUser {
  id: number;
  login: string;
}

interface Payload {
  requester?: GithubUser;
  member?: GithubUser;
  sender?: GithubUser;
}

export const PayloadMapper = {
  mapToDeveloper(payload: Payload): DeveloperInput {
    const developer = payload.requester || payload.member || payload.sender;
    return developer && { developerId: developer.id, name: developer.login };
  },
};
