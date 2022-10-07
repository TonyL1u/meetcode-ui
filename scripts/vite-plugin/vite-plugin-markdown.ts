import fs from 'fs';
import lz from 'lz-string';
import type { Plugin } from 'vite';

const fileRegex = /\.(md)$/;

export default function TransformMarkdown(): Plugin {
    return {
        enforce: 'pre',
        name: 'transform-markdown-file',
        transform(src, id) {
            if (fileRegex.test(id)) {
                const [_, component, lang] = id.match(/src\/(.*)\/demos\/doc.(.*).md/)!;
                const docContent = fs.readFileSync(id, 'utf-8');
                const files = getDemoFiles(docContent, `src/${component}/demos/${lang}`);
                const setupScript = ['<script setup>', ...files.map(({ name }) => `import ${name} from './${lang}/${name}.demo.vue';`), '</script>'].join('\n');
                const demoTemplate = [
                    '<div class="code-container" style="column-count: 2; column-gap: 18px">',
                    ...files.map(({ name, path, source, decodeHash }) => {
                        const compressedSource = lz.compressToEncodedURIComponent(source);
                        const codeSources = { name, path, source, compressedSource };

                        return [`<CodeDemo code-sources="${escapeHtml(JSON.stringify(codeSources))}"  hash="${decodeHash}">`, `<${name}></${name}>`, `</CodeDemo>`].join('\n');
                    }),
                    '</div>'
                ];
                const [start, end] = getTokenIndex(docContent);
                const docLineArray = docContent.split('\n');
                docLineArray.splice(start, end - start + 1, ...demoTemplate, '');

                return [setupScript, ...docLineArray].join('\n');
            }
        }
    };
}

function getDemoFiles(docContent: string, demoDir: string) {
    const docLineArray = docContent.split('\n');
    const [start, end] = getTokenIndex(docContent);
    const files = docLineArray.slice(start + 1, end);

    return files.map(name => {
        const demoPath = `${demoDir}/${name}.demo.vue`;
        const source = fs.readFileSync(demoPath, 'utf-8');
        const markdownLineArray =
            source
                .match(/<markdown>([\s\S]*?)<\/markdown>/)?.[1]
                ?.trim()
                ?.split('\n') ?? [];
        const hash = markdownLineArray.find(line => line.startsWith('### '))?.split(' ')[1] ?? '';

        return { name, path: demoPath, source: source.split('</markdown>')[1]?.trim() ?? source, decodeHash: decodeURI(hash) };
    });
}

function getTokenIndex(docContent: string) {
    const docLineArray = docContent.split('\n');
    const openTokenIndex = docLineArray.indexOf('```demo');
    const closeTokenIndex = docLineArray.indexOf('```', openTokenIndex + 1);

    return [openTokenIndex, closeTokenIndex];
}

type HtmlUnsafeChar = '&' | '<' | '>' | '"';
/**
 * copy from markdown-it
 * @source markdown-it/lib/common/utils.js
 */
const HTML_ESCAPE_TEST_RE = /[&<>"]/;
const HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
const HTML_REPLACEMENTS: Record<HtmlUnsafeChar, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
};
function escapeHtml(str: string) {
    if (HTML_ESCAPE_TEST_RE.test(str)) {
        return str.replace(HTML_ESCAPE_REPLACE_RE, ch => HTML_REPLACEMENTS[ch as HtmlUnsafeChar]);
    }
    return str;
}
