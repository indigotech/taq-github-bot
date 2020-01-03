import { Context } from 'probot';
import { Service } from 'typedi';
import { DeveloperInput, InitiateUserUseCase } from '@domain';
import { PayloadMapper } from './payload.mapper';
import { Receiver } from './receiver';

@Service()
export class InstallationReceiver extends Receiver {
  constructor(
    private readonly initiateUseCase: InitiateUserUseCase,
  ) {
    super();
  }

  onReceive = async (context: Context): Promise<void> => {
    const devInput: DeveloperInput = PayloadMapper.mapToDeveloper(context.payload);

    if (!devInput) {
      context.log(`Developer was not foun on hook, nothing to do...`);
      return;
    }

    const user = await this.initiateUseCase.execute(devInput);

    if (user.alreadyExists) {
      context.log(`Developer "${user.developer.name}" is already registered, nothing to do...`);
    } else {
      await this.eventsSender.openEvent(context, user.developer);
    }
  }
}
