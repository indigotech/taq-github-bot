import { Service } from 'typedi';
import { Developer } from '@domain/entities/developer.model';
import { WebhookPayloadWithRepository } from 'probot/lib/context';

@Service()
export class GithubPayloadMapper {
  mapUser(payload: WebhookPayloadWithRepository): Developer {
    const devData = payload.sender;
    return {
      githubId: devData.id,
      name: devData.login,
      currentTrack: 0,
      currentStep: 0,
    };
  }
}
