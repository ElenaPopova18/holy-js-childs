const { ReadableStream, MessagePort, MessageChannel } = require('node:worker_threads');

module.exports = {
  preset: '@tramvai/test-unit-jest',
  testPathIgnorePatterns: ['node_modules/', '__integration__', 'index.spec.tsx'],
  testEnvironment: 'jsdom',
  globals: {
    ReadableStream,
    MessagePort,
    MessageChannel,
  },
  forceExit: true,
  clearMocks: true,
  collectCoverage: true,
  coverageReporters: ['text-summary', 'lcov'],
  coverageDirectory: 'coverage/jest',
};
