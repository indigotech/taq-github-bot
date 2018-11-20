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

  onReceive = async (context: Context) => {
    console.log('Recebeu');
    const devInput: DeveloperInput = PayloadMapper.mapToDeveloper(context.payload);

    const user = await this.initiateUseCase.execute(devInput);

    if (user.alreadyExists) {
      context.log(`Developer "${user.developer.name}" is already registered, nothing to do...`);
    } else {
      this.eventsSender.openEvent(context, user.developer);
    }
  }
}
