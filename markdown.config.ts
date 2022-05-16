import MarkdownItContainer from 'markdown-it-container';
import MarkdownItHljs from 'markdown-it-highlightjs';
import MarkdownItAnchor from 'markdown-it-anchor';
import fs from 'fs';
import lz from 'lz-string';
import type MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token';
import type Renderer from 'markdown-it/lib/renderer';

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
            render: function (tokens: Token[], idx: number, options: any, env: { id: string }) {
                const token = tokens[idx];
                const decodeHash = tokens[idx + 1]?.tag === 'h3' ? decodeURI(tokens[idx + 1].attrs?.[0][1] || '') : '';
                const isTokenNesting = token.nesting === 1;
                const demo = token.info.trim().match(/^demo\s*(.*)$/);
                const code = token.info.trim().match(/^demo\s*(CodePreview=(.*))/);

                if (!isTokenNesting) return `</CodeDemo>`;

                if (code) {
                    const pathMatcher = env.id.match(/src\/(.*)\/demos\/doc.(.*).md/);
                    const components = code[2].split(',');
                    const codeSources = components.map(name => {
                        const manuallyPath = name.match(/(.*)\[(.*)\]/);
                        const path = manuallyPath ? manuallyPath[2] : `src/${pathMatcher![1]}/demos/${pathMatcher![2]}/${name}.vue`;
                        const importSource = fs.readFileSync(path, 'utf-8').trim();
                        const compressedSource = lz.compressToEncodedURIComponent(importSource);

                        return {
                            name: manuallyPath ? manuallyPath[1] : name,
                            importSource,
                            compressedSource
                        };
                    });

                    return `<CodeDemo code-sources="${md.utils.escapeHtml(JSON.stringify(codeSources))}" hash="${decodeHash}">`;
                } else if (demo) {
                    return `<CodeDemo hash="${decodeHash}">`;
                }
            }
        });

        md.renderer.rules['heading_open'] = function (tokens, idx, options, env: { id: string }, self) {
            if (tokens[idx].tag === 'h1') {
                return `<EditOnGithub ${self.renderAttrs(tokens[idx])} path="${env.id.split('/meetcode-ui/')[1]}">`;
            }

            return self.renderToken(tokens, idx, options);
        };

        md.renderer.rules['heading_close'] = function (tokens, idx, options, env, self) {
            if (tokens[idx].tag === 'h1') {
                return '</EditOnGithub>';
            }

            return self.renderToken(tokens, idx, options);
        };

        const componentRenderRule: Renderer.RenderRule = function (tokens, idx, options, env: { id: string }, self) {
            const { content } = tokens[idx];
            const name = content.match(/<(.*)\/>/);
            if (env.id.indexOf('/meetcode-ui/src') > -1 && name && name[1].trim().slice(0, 2) !== 'Mc') {
                const pathMatcher = env.id.match(/src\/(.*)\/demos\/doc.(.*).md/);
                if (pathMatcher && name) return `<${pathMatcher[1]}-${name[1].trim()}-${pathMatcher[2].split('-')[0]} ${self.renderAttrs(tokens[idx])} />`;
            }

            return content;
        };

        md.renderer.rules['html_block'] = componentRenderRule;

        md.renderer.rules['html_inline'] = componentRenderRule;

        const fenceWrap = (render: Renderer.RenderRule) => (tokens: Token[], idx: number, options: MarkdownIt.Options, env: any, self: any) => {
            const code = lz.compressToEncodedURIComponent(tokens[idx].content);
            return `<CodeBlock lang="${tokens[idx].info}" code="${code}">${render.apply(this, [tokens, idx, options, env, self])}</CodeBlock>`;
        };

        md.renderer.rules['fence'] = fenceWrap(md.renderer.rules['fence']!);
    }
};
