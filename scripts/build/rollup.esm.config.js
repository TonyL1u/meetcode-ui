import basicConfig, { name, file } from './rollup.config';

export default {
    ...basicConfig,
    output: {
        name,
        file: file('esm'),
        format: 'es',
        globals: {
            // 设定全局变量的名称
            vue: 'Vue',
            'lodash-es': '_'
        },
        exports: 'named'
    }
};
