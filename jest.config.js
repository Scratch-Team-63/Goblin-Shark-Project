/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "/private/var/folders/t8/293s453n63b21m4k85y_w6gw0000gp/T/jest_dy",

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  forceExit: true,

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

  // Indicates whether each individual test should be reported during the run
  verbose: true,

};

module.exports = config;
