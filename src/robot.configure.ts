import IORedis from 'ioredis';
import Container from 'typedi';
import { REDIS } from './data/db';
import { configureTracks } from './data/local/track.configure';

export function configureRobot() {
  configureDB();
  configureTracks();
}

function configureDB() {
  Container.set(REDIS, new IORedis(process.env.REDIS_URL));
  console.info('Connected to Database...');
}
