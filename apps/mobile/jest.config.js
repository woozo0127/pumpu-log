/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./jest.setup.ts'],
  roots: ['<rootDir>/__tests__', '<rootDir>/src'],
  transformIgnorePatterns: [],
  moduleNameMapper: {
    '^~/(.*)\\.js$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '^@pumpu-log/ui-kit$': '<rootDir>/src/test/__mocks__/ui-kit.tsx',
    '^lucide-react-native$': '<rootDir>/src/test/__mocks__/lucide-react-native.tsx',
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
  testRegex: [],
};
