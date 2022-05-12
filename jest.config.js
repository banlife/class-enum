module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '<rootDir>/tests/**/*.test.[jt]s?(x)',
    '<rootDir>/tests/**/*.test.[jt]s?(x)',
  ],
}
