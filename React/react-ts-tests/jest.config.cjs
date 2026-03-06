module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(svg)$': '<rootDir>/src/__mocks__/svgMock.js',
  },

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx', 
          verbatimModuleSyntax: false,
          esModuleInterop: true,
        },
      },
    ],
  },
};