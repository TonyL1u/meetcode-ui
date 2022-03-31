import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import { name } from '../../package.json';

const extensions = ['.js', '.ts', '.tsx'];
// 输出打包后的文件名称type 1.esm 2.umd
const file = type => `lib/${name}.${type}.js`;
const overrides = {
    // 忽略any
    compilerOptions: { noImplicitAny: false },
    exclude: ['playground', 'pages', 'scripts', '*.config.ts', 'src/**/__tests__']
};
export { name, file };
export default {
    input: 'src/index.ts',
    plugins: [
        vue({
            css: true,
            compileTemplate: true
        }),
        resolve(extensions),
        commonjs({
            include: ['node_modules/**', 'node_modules/**/*']
        }),
        typescript({ tsconfigOverride: overrides }),
        postcss({
            extensions: ['.css'],
            extract: true,
            plugins: [postcssImport(), tailwindcss()]
        })
    ],
    external: ['vue', 'lodash-es'] // 规定哪些是外部引用的模块
};
