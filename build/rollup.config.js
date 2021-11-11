import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import css from 'rollup-plugin-css-only';
import scss from 'rollup-plugin-scss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dartSass from 'sass';
import { name } from '../package.json';

// 输出打包后的文件名称type 1.esm 2.umd
const file = type => `dist/${name}.${type}.js`;
const overrides = {
    compilerOptions: { declaration: true }, // 生成.d.ts的文件
    exclude: ['tests/**/*.ts', 'tests/**/*.tsx']
};
export { name, file };
export default {
    input: 'src/index.ts',
    output: {
        name,
        file: file('esm'),
        format: 'es'
    },
    plugins: [
        scss({ include: /\.scss$/, sass: dartSass }),
        nodeResolve(),
        typescript({ tsconfigOverride: overrides }),
        vue(),
        css({ output: 'bundle.css' }) // 可自行修改output文件名
    ],
    external: ['vue', 'lodash-es'] // 规定哪些是外部引用的模块
};
