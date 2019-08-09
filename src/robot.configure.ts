import IORedis from 'ioredis';
import Container from 'typedi';
import { REDIS } from './data/db';
import { ONBOARD_STACK, OnboardStack, TrackConfigure } from './data/local/track.configure';

export function configureRobot() {
  configureDB();
  configureTracks();
}

function configureDB() {
  Container.set(REDIS, new IORedis(process.env.REDIS_URL));
  console.info('Connected to Database...');
}

function configureTracks() {
  Container.set(ONBOARD_STACK, process.env.ONBOARD_STACK || OnboardStack.React);
  Container.get(TrackConfigure).configure();
}
