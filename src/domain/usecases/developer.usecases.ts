import { OnboardDataSource } from "data/onboard.datasource";
import { Track } from "domain/entities/track.entity";
import { Developer } from "domain/entities/developer.entity";

export class DeveloperUseCases {

  constructor(
    private onboardDataSource: OnboardDataSource,
  ) { }

  getNextTrack(developer: Developer): Track {
    return this.onboardDataSource.getTrack(developer.currentTrack);
  }
}
