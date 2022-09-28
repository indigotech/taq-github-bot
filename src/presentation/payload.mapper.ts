import { DeveloperInput } from '@domain/developer.model';
import { WebhookPayloadWithRepository } from 'probot';

export const PayloadMapper = {
  mapToDeveloper(payload: WebhookPayloadWithRepository): DeveloperInput {
    const developer = payload.requester || payload.member || payload.sender;
    return developer && { developerId: developer.id, name: developer.login };
  },
};
