import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import { name } from '../package.json';

const extensions = ['.js', '.ts', '.tsx'];
// 输出打包后的文件名称type 1.esm 2.umd
const file = type => `lib/${name}.${type}.js`;
const overrides = {
    compilerOptions: { declaration: true }, // 生成.d.ts的文件
    exclude: ['playground', 'pages', '*.config.ts']
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
        vue({
            css: true,
            compileTemplate: true
        }),
        resolve(extensions),
        commonjs({
            include: ['node_modules/**', 'node_modules/**/*']
        }),
        // scss({ include: /\.scss$/, sass: dartSass }),
        typescript({ tsconfigOverride: overrides }),
        postcss({
            extensions: ['.css'],
            extract: true,
            plugins: [postcssImport(), tailwindcss()]
        })
    ],
    external: ['vue', 'lodash-es'] // 规定哪些是外部引用的模块
};
