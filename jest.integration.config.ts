import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: '@tramvai/test-integration-jest',
  testMatch: ['**/__integration__/**/?(*.)+(test).[jt]s?(x)'],
};

export default config;
