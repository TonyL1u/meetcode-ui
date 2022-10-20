import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';
import type { Plugin } from 'vite';

const fileRegex = /\.(demo.vue)$/;
const md = new MarkdownIt();
md.use(MarkdownItAnchor, {
    permalink: MarkdownItAnchor.permalink.headerLink()
});

export default function TransformDemo(): Plugin {
    return {
        enforce: 'pre',
        name: 'transform-demo-file',
        transform(src, id) {
            if (fileRegex.test(id)) {
                const [templateStartIndex, templateEndIndex] = [src.indexOf('<template>'), src.lastIndexOf('</template>')];
                const templateText = src.slice(templateStartIndex + 10, templateEndIndex);
                const markdownText = src.match(/<markdown>([\s\S]*?)<\/markdown>/)?.[1]?.trim() ?? '';
                const scriptText = src.match(/<script.*?>([\s\S]*?)<\/script>/)?.[1]?.trim() ?? '';
                const styleText = src.match(/<style.*?>([\s\S]*?)<\/style>/)?.[1]?.trim() ?? '';
                const renderResult = md.render(markdownText || '');

                return `<template>
                ${renderResult}
                ${templateText}
                </template>
                <script lang="ts" setup>
                ${scriptText}
                </script>
                <style scoped>
                ${styleText}
                </style>
                `;
            }
        }
    };
}
