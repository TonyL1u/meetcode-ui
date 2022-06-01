import { getCurrentInstance, onMounted, watch } from 'vue';
import * as monaco from 'monaco-editor';
import { createSingletonPromise } from '@antfu/utils';
import { orchestrator } from '../orchestrator';

/* __imports__ */
import vueuseTypes from '@vueuse/core/index.d.ts?raw';
import vueTypes from '@vue/runtime-core/dist/runtime-core.d.ts?raw';
import iconTypes from '@vicons/ionicons5/index.d.ts?raw';
import McUiComponents from '@lib/components.d.ts?raw';

async function getAllMeetcodeTypes() {
    const exportDeclares = McUiComponents.split('\r\n');
    let allTypes = '';

    for (const declare of exportDeclares) {
        const name = declare.slice(17, -2);
        if (name) {
            const types = (await import(`../../lib/${name}/index.d.ts?raw`)).default;
            types && (allTypes = `${allTypes}\n${types}`);
        }
    }

    return allTypes;
}

const setup = createSingletonPromise(async () => {
    // validation settings
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false
    });

    // compiler options
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        strict: false,
        noUnusedLocals: false,
        noUnusedParameters: false,
        allowUnreachableCode: true,
        allowUnusedLabels: true,
        target: monaco.languages.typescript.ScriptTarget.ESNext,
        allowNonTsExtensions: true,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        typeRoots: ['node_modules/@types']
    });

    const registered: string[] = ['vue', '@vueuse/core', '@vicons/ionicons5', 'meetcode-ui'];

    monaco.languages.typescript.javascriptDefaults.addExtraLib(
        `
    declare module '@vueuse/core' { ${vueuseTypes} }
  `,
        'ts:vueuse'
    );

    monaco.languages.typescript.javascriptDefaults.addExtraLib(
        `
    declare module 'vue' { ${vueTypes} }
  `,
        'ts:vue'
    );

    monaco.languages.typescript.javascriptDefaults.addExtraLib(
        `
        declare module '@vicons/ionicons5' { ${iconTypes} }
      `,
        'ts:vicons'
    );

    if (!import.meta.env.PROD) {
        monaco.languages.typescript.javascriptDefaults.addExtraLib(
            `
            declare module 'meetcode-ui' { ${await getAllMeetcodeTypes()} }
          `,
            'ts:meetcode-ui'
        );
    }

    watch(
        () => orchestrator.packages,
        () => {
            orchestrator.packages.forEach(pack => {
                if (registered.includes(pack.name)) return;

                registered.push(pack.name);
                monaco.languages.typescript.javascriptDefaults.addExtraLib(
                    `
        declare module '${pack.name}' {
          let x: any;
          export = x;
        }
      `,
                    `ts:${pack.name}`
                );
            });
        },
        { immediate: true }
    );

    await Promise.all([
        // load workers
        (async () => {
            const [{ default: EditorWorker }, { default: HtmlWorker }, { default: TsWorker }] = await Promise.all([
                import('monaco-editor/esm/vs/editor/editor.worker?worker'),
                // import('monaco-editor/esm/vs/language/html/html.worker?worker'),
                import('./languages/html/html.worker?worker'),
                import('monaco-editor/esm/vs/language/typescript/ts.worker?worker')
            ]);

            // @ts-expect-error
            window.MonacoEnvironment = {
                getWorker(_: any, label: string) {
                    if (label === 'html' || label === 'handlebars' || label === 'razor') return new HtmlWorker();
                    if (label === 'typescript' || label === 'javascript') return new TsWorker();
                    return new EditorWorker();
                }
            };
        })()
    ]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const injection_arg = monaco;

    /* __async_injections__ */

    if (getCurrentInstance()) await new Promise<void>(resolve => onMounted(resolve));

    return { monaco };
});

export default setup;

setup();
