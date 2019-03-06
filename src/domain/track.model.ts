
export interface Track {
  number: number;
  title: string;
  steps: Step[];
  conditions: Condition[];
}

export interface Step {
  body: string;
}

export interface Condition {
  type: ConditionType;
  parameter: string;
}

export enum ConditionType {
  Push = 'push',
}
