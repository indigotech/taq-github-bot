import { OpenStepType, Step } from './step.model';

export interface Track {
  title: string;
  steps: Step[];
  openStrategy: OpenTrackType;
  openStepStrategy: OpenStepType;
}

export type OpenTrackType = 'issue'
| 'pull-request';
