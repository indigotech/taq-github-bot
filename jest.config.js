const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/'],
  verbose: true,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testRegex: '(/tests/.*|\\.(test|spec))\\.(ts|js)$',
  testPathIgnorePatterns: [
    '/node_modules/',
    'dist/*'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', '.map'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
};