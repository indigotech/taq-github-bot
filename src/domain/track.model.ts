export interface Step {
  body: string;
}

export class Track {
  number: number;
  title: string;
  steps: Step[];

  increment(): Track {
    return null;
  }
}
