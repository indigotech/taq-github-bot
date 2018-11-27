const tsconfig = require('./tsconfig.json')

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
  moduleNameMapper: {
    '^@core': '<rootDir>/src/core',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@data': '<rootDir>/src/data',
    '^@data/(.*)$': '<rootDir>/src/data/$1',
    '^@domain': '<rootDir>/src/domain',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@presentation': '<rootDir>/src/presentation',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
  },
}
