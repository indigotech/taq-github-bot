import 'reflect-metadata';
import IORedis from 'ioredis';
import Container from 'typedi';
import { REDIS } from '@data/db';
import { Robot } from './robot';

Container.set(REDIS, new IORedis(process.env.REDIS_DB_PARAM));
const robot = Container.get(Robot);

export = robot.webhookReceiver;
