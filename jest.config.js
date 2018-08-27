module.exports = {
  verbose: true,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: '(/tests/.*|\\.(test|spec))\\.(ts|js)$',
  testPathIgnorePatterns: [
    '/node_modules/',
    'dist/*',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '@domain/(.*)': '<rootDir>/src/domain/$1',
    '@data/(.*)': '<rootDir>/src/data/$1',
    '@presentation/(.*)': '<rootDir>/src/presentation/$1',
  },
};