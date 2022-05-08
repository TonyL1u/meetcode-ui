import MarkdownItContainer from 'markdown-it-container';
import MarkdownItHljs from 'markdown-it-highlightjs';
import MarkdownItAnchor from 'markdown-it-anchor';
import fs from 'fs';
import lz from 'lz-string';
import type MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token';

let MAIN = '';
let LANG: 'zh-CN' | 'en-US' | '' = '';
const META_REG = /^meta\s*(Component=(.*),Lang=(.*))/;
const CODE_PREVIEW_REG = /^demo\s*(CodePreview=(.*))/;

export default {
    // default options passed to markdown-it
    // see: https://markdown-it.github.io/markdown-it/
    markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true
    },
    markdownItSetup(md: MarkdownIt) {
        md.use(MarkdownItAnchor, {
            permalink: MarkdownItAnchor.permalink.headerLink()
        });
        md.use(MarkdownItHljs);
        md.use(MarkdownItContainer, 'meta', {
            marker: '@',
            render: function (tokens: Token[], idx: number) {
                const token = tokens[idx];
                const meta = token.info.trim().match(META_REG);

                if (meta) {
                    MAIN = meta[2];
                    LANG = meta[3] as 'zh-CN' | 'en-US';
                }

                if (token.nesting === -1) {
                    MAIN = '';
                    LANG = '';
                }

                return '';
            }
        });
        md.use(MarkdownItContainer, 'demo', {
            validate: function (params: string) {
                return params.trim().match(/^demo\s*(.*)$/);
            },
            render: function (tokens: Token[], idx: number) {
                const token = tokens[idx];
                const isTokenNesting = token.nesting === 1;
                const demo = token.info.trim().match(/^demo\s*(.*)$/);
                const code = token.info.trim().match(CODE_PREVIEW_REG);

                if (!isTokenNesting) return `</CodeDemo>`;

                if (code) {
                    const components = code[2].split(',');
                    const codeSources = components.map(name => {
                        const manuallyPath = name.match(/(.*)\[(.*)\]/);
                        const path = manuallyPath ? manuallyPath[2] : `src/${MAIN}/demos/${LANG}/${name}.vue`;
                        const importSource = fs.readFileSync(path, 'utf-8').trim();
                        const compressedSource = lz.compressToEncodedURIComponent(importSource);

                        return {
                            name: manuallyPath ? manuallyPath[1] : name,
                            importSource,
                            compressedSource
                        };
                    });

                    return `<CodeDemo code-sources="${md.utils.escapeHtml(JSON.stringify(codeSources))}">`;
                } else if (demo) {
                    return `<CodeDemo>`;
                }
            }
        });
    },
    // Class names for the wrapper div
    wrapperClasses: 'markdown-body'
};
