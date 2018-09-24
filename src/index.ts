import 'reflect-metadata';
import Redis from 'ioredis';
import Container from 'typedi';
import { REDIS } from '@data/db';
import { robot } from '@presentation/robot';

Container.set(REDIS, new Redis(process.env.REDIS_URL));

export = robot;
