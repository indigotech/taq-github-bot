import { InitiateUserUseCase } from '@domain';
import { DeveloperInput } from '@domain/developer.model';
import { Context } from 'probot';
import { Service } from 'typedi';
import { Payload } from './payload.body';
import { PayloadMapper } from './payload.mapper';
import { Receiver } from './receiver';

@Service()
export class InstallationReceiver extends Receiver {
  constructor(private readonly initiateUseCase: InitiateUserUseCase) {
    super();
  }

  onReceive = async (context: Context<Payload>): Promise<void> => {
    if (context.isBot) {
      return;
    }

    const devInput: DeveloperInput = PayloadMapper.mapToDeveloper(context.payload);

    if (!devInput) {
      context.log.warn(`Developer was not found on hook, nothing to do...`);
      return;
    }

    const user = await this.initiateUseCase.execute(devInput);

    if (user.alreadyExists) {
      context.log.info(`Developer "${user.developer.name}" is already registered, nothing to do...`);
    } else {
      await this.eventsSender.openEvent(context, user.developer);
    }
  };
}
