import { config } from 'dotenv';
import Container from 'typedi';
import { ONBOARD_STACK, OnboardStack, TrackConfigure } from './data/local/track.configure';

export function configureRobot() {
  config();
  configureTracks();
}

function configureTracks() {
  Container.set(ONBOARD_STACK, process.env.ONBOARD_STACK ?? OnboardStack.React);
  Container.get(TrackConfigure).configure();
}
