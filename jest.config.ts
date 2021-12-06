import { InitialOptionsTsJest, pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import { defaults as tsjPreset } from 'ts-jest/presets';

const config: InitialOptionsTsJest = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'jsdom',
    moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1', ...pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */) },
    moduleDirectories: ['node_modules', 'src'],
    globals: {
        'ts-jest': {
            // 指定ts-jest使用的tsconfig配置
            tsconfig: 'tsconfig.json',
            useESM: true
        }
    },
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        // '^.+\\js$': 'babel-jest',
        // ...tsjPreset.transform
        '^.+\\.(t|j)sx?$': [
            'babel-jest',
            {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                node: true
                            }
                        }
                    ],
                    '@babel/preset-typescript'
                ]
            }
        ]
    },
    testPathIgnorePatterns: ['/node_modules/'],
    // transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
    moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node']
};

export default config;
