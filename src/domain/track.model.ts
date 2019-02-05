export interface Step {
  body: string;
}

export interface Track {
  number: number;
  title: string;
  steps: Step[];
}
