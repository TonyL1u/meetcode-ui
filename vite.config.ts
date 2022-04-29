import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteCompression from 'vite-plugin-compression';
import path from 'path';
import Markdown from 'vite-plugin-md';
import MarkdownConfig from './markdown.config';

const isProduction = process.env.NODE_ENV === 'production';
const prefix = 'monaco-editor/esm/vs';
const resolve = (dir: string) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
    base: isProduction ? '/public/meetcode-ui/' : '/',
    resolve: {
        alias: {
            'meetcode-ui': resolve('src'),
            '@': resolve('src'),
            '@lib': resolve('lib'),
            '@playground': resolve('playground'),
            '@pages': resolve('pages')
        }
    },
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/]
        }),
        vueJsx(),
        Markdown(MarkdownConfig),
        viteCompression()
    ],
    server: {
        port: 3001,
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://localhost:7001/api',
                changeOrigin: true,
                ws: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    },
    optimizeDeps: {
        include: [`${prefix}/language/css/css.worker`, `${prefix}/language/html/html.worker`, `${prefix}/language/typescript/ts.worker`, `${prefix}/editor/editor.worker`]
    }
    // esbuild: {
    //     jsxFactory: 'h',
    //     jsxFragment: 'Fragment'
    // }
});
