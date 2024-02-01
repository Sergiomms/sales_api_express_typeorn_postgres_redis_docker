// used: yarn add -D @types/ioredis@4.28.10 for ioredis types

import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  },
  driver: string;
}

export default {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined,
    }
  },
  driver: 'redis'
} as ICacheConfig;