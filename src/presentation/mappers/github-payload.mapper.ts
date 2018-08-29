import { DeveloperInput } from '@domain/entities';

export function mapToWebhookToDeveloper(payload): DeveloperInput {
  const devData = payload.sender;
  return { githubId: devData.id, name: devData.login };
}
