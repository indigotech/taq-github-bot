export interface Track {
  number: number;
  title: string;
  steps: Step[];
}

export interface Step {
  body: string;
}
