const fs = require('fs-extra');
const esModules = ['lodash-es'].map(pkg => {
    if (fs.pathExistsSync('node_modules/.pnpm')) {
        return `.pnpm/${pkg}`;
    } else {
        return pkg;
    }
});

/** @type {import('ts-jest').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/**/*.(ts|tsx)'],
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: ['text', 'lcov'],
    globals: {
        __DEV__: true
    },
    moduleDirectories: ['node_modules'],
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    moduleNameMapper: {
        '\\.(css|less|scss|sss|styl)$': 'jest-css-modules'
    },
    setupFiles: ['jest-canvas-mock'],
    testEnvironment: 'jest-environment-jsdom',
    testMatch: ['<rootDir>/src/**/*.(spec|test).(ts|tsx)'],
    testPathIgnorePatterns: ['/node_modules/'],
    testURL: 'http://localhost',
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.(jsx|js)?$': 'babel-jest',
        '^.+\\.(tsx|ts)?$': 'ts-jest'
    },
    transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
    verbose: false
};
