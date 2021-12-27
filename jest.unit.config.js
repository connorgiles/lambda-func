const baseConfig = require('./jest.config')

module.exports = {
  ...baseConfig,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*'],
  coverageDirectory: 'coverage',
  // TODO: enable this once coverage is ready
  // coverageThreshold: {
  //   global: {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100
  //   }
  // },
  testRegex: '.*test\\.(t|j)sx?$'
}
