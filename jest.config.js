const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig')

module.exports = {
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
  verbose: true,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testRegex: '(/tests/.*|\\.(test|spec))\\.(ts|js)$',
  testPathIgnorePatterns: [
    '/node_modules/',
    'dist/*'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
}
