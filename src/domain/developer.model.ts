export interface DeveloperInput {
  name: string;
  developerId: number;
}

export interface DeveloperProgress {
  track: number;
  step: number;
  completed: number; // [0,1]
}

export interface Developer extends DeveloperInput {
  progress: DeveloperProgress;
}
