export interface Track {
  title: string;
  description: string;
  steps: Step[];
}

export interface Step {
  body: string;
}
