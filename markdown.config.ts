import type MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token';
import MarkdownItContainer from 'markdown-it-container';
import MarkdownItHljs from 'markdown-it-highlightjs';
import MarkdownItAnchor from 'markdown-it-anchor';
import fs from 'fs';
import path from 'path';

const fileSourceMap: any = {
    '@pages': 'pages',
    '@': 'src'
};

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
        md.use(MarkdownItContainer, 'demo', {
            validate: function (params: string) {
                return params.trim().match(/^demo\s*(.*)$/);
            },
            render: function (tokens: Token[], idx: number) {
                const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
                if (m && tokens[idx].nesting === 1) {
                    const ScriptSetup = tokens[0].content.split('\n').slice(1, -2);
                    const ComponentMap: any = {};
                    for (const ipt of ScriptSetup) {
                        const workTags = ipt.trim().split(' ');
                        if (workTags[0] === 'import') {
                            const key: string = workTags[1];
                            const src: string = workTags[3];
                            ComponentMap[key] = src.slice(1, -1);
                        }
                    }

                    const components: Array<string> = m[1] ? m[1].split('codePreview=')[1].split(',') : [];
                    const codeSources = components.map((name: string) => {
                        const [root, ...rest] = ComponentMap[name].split('/');
                        const rootDir = fileSourceMap[root];
                        const importPath = path.join(__dirname, `${rootDir}/${rest.join('/')}`);
                        const importSource = fs.readFileSync(importPath, 'utf-8').trim();

                        return {
                            name,
                            importSource
                        };
                    });

                    return `<CodeDemo code-sources="${md.utils.escapeHtml(JSON.stringify(codeSources))}">`;
                } else {
                    // closing tag
                    return `</CodeDemo>`;
                }
            }
        });
    },
    // Class names for the wrapper div
    wrapperClasses: 'markdown-body'
};
