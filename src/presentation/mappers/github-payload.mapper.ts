import { DeveloperInput } from '@domain/entities';

export function mapFromWebhookToDeveloper(payload): DeveloperInput {
  const devData = payload.sender;
  return { githubId: devData.id, name: devData.login };
}
