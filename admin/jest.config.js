module.exports = {
  roots: ['<rootDir>'],
  automock: false,
  clearMocks: true,
  setupFilesAfterEnv: [],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^src(.*)$': '<rootDir>/src$1',
    '^public(.*)$': '<rootDir>/public$1',
  },
  testTimeout: 10000,
  testEnvironment: 'jsdom',
}
