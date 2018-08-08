import { Step, OpenStepType } from "./step.model";

export interface Track {
  title: string;
  body: string;
  steps: Step[];
  openStrategy: OpenTrackType
  openStepStrategy: OpenStepType
}

export type OpenTrackType = 'issue'
| 'pull-request';