export interface DeveloperInput {
  name: string;
  developerId: number;
}

export interface DeveloperProgress {
  track: number;
  step: number;
  completedStepsOverall: number;
}

export interface Developer extends DeveloperInput {
  progress: DeveloperProgress;
  issueId: number;
}
