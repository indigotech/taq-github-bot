import { Context } from 'probot';
import { Service } from 'typedi';
import {
  CheckConditionTypeUseCase, CheckPushParameterUseCase, ConditionType, DeveloperInput,
  IncrementDeveloperProgressUseCase,
} from '@domain';
import { PayloadMapper } from './payload.mapper';
import { Receiver } from './receiver';

export interface PushInfo {
  ref: string;
  added?: string[];
}

@Service()
export class PushReceiver extends Receiver {
  constructor(
    private readonly checkConditionTypeUseCase: CheckConditionTypeUseCase,
    private readonly checkPushParameterUseCase: CheckPushParameterUseCase,
    private readonly incrementProgressUseCase: IncrementDeveloperProgressUseCase,
  ) {
    super();
  }

  onReceive = async (context: Context) => {

    if (context.isBot) {
      return;
    }

    const devInput: DeveloperInput = PayloadMapper.mapToDeveloper(context.payload);
    const isSameConditionType = await this.checkConditionTypeUseCase.execute(devInput.developerId, ConditionType.Push);

    if (!isSameConditionType) {
      return;
    }

    const pushInfo: PushInfo = PayloadMapper.mapToPushEvent(context.payload);
    console.log('pushInfo:', pushInfo);
    const isPushCorrect = await this.checkPushParameterUseCase.execute(devInput.developerId, pushInfo.ref);
    console.log('isPushCorrect', isPushCorrect);
    if (isPushCorrect) {
      this.incrementProgress(context, devInput);
    }
  }

  private async incrementProgress(context, devInput: DeveloperInput) {
    const developer = await this.incrementProgressUseCase.execute(devInput.developerId);
    console.log('developer', developer);
    this.eventsSender.openEvent(context, developer);
  }
}
