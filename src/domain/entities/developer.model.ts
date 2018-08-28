export interface DeveloperInput {
  name: string;
  githubId: number;
}

export interface Developer extends DeveloperInput {
  currentTrack: number;
  currentStep: number;
}

export function getDeveloper(input: DeveloperInput, track?: number, step?: number): Developer {
  return { ...input, currentTrack: track || 0, currentStep: step || 0 };
}
