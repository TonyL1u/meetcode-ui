import basicConfig, { name, file } from './rollup.config';

export default {
    ...basicConfig,
    output: {
        name,
        file: file('umd'),
        format: 'umd',
        globals: {
            // 设定全局变量的名称
            vue: 'Vue',
            'lodash-es': '_',
            animejs: 'Anime'
        },
        exports: 'named'
    }
};
