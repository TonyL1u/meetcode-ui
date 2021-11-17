import { reactive, watch, watchEffect } from 'vue';
// import { parse } from '@vue/compiler-sfc'
import { createEventHook, EventHookOn } from '@vueuse/core';
// import lz from 'lz-string';
import { compileFile } from './compiler/sfcCompiler';
// const demos = import.meta.glob('../demos/**/*.(vue|json)')
import InitialCode from './source/demoInitialCode';

const shouldUpdateContent = createEventHook();

export interface OrchestratorPackage {
    name: string;
    description?: string;
    version?: string;
    url: string;
    source?: string;
}

export class OrchestratorFile {
    filename: string;
    template: string;
    script: string;
    style: string;

    compiled = {
        js: '',
        css: '',
        ssr: ''
    };

    constructor(filename: string, template: string | undefined, script: string | undefined, style?: string) {
        this.filename = filename;
        this.template = template || '';
        this.script = script || '';
        this.style = style || '';
    }

    get code() {
        return `
      <script setup lang="ts">
        ${this.script}
      </script>
      <template>
        ${this.template}
      </template>
      `;
    }
}

export interface Orchestrator {
    files: {
        [key: string]: OrchestratorFile;
    };
    packages: OrchestratorPackage[];
    activeFilename: string;
    errors: (string | Error)[];
    runtimeErrors: (string | Error)[];

    readonly activeFile: OrchestratorFile | undefined;
    readonly importMap: string;
}

/**
 * Main app orchestrator, handles all the files, import maps, and errors
 */
export const orchestrator: Orchestrator = reactive({
    files: {
        'App.vue': new OrchestratorFile('App.vue', '', '')
    },
    packages: [],
    activeFilename: 'App.vue',
    errors: [],
    runtimeErrors: [],

    get activeFile() {
        // @ts-ignore
        return orchestrator.files[this.activeFilename];
    },

    get importMap() {
        const imports = orchestrator.packages.map(({ name, url }) => `"${name}": "${url}"`);

        return `
      {
        "imports": {
          ${imports.join(',\n')}
        }
      }
    `;
    }
});

/**
 * Setup Watchers
 */

watchEffect(() => {
    if (orchestrator.activeFile) compileFile(orchestrator.activeFile);
});

watch(
    () => orchestrator.activeFilename,
    () => {
        shouldUpdateContent.trigger(null);
    }
);

// export function exportState() {
//     const files = Object.entries(orchestrator.files).reduce((acc: any, [name, { template, script }]) => {
//         acc[name] = { template, script };
//         return acc;
//     }, {});

//     return lz.compressToEncodedURIComponent(
//         JSON.stringify({
//             packages: orchestrator.packages,
//             files
//         })
//     );
// }

/**
 * Add a file to the orchestrator
 *
 * @param file File content
 */
export function addFile(file: OrchestratorFile) {
    orchestrator.files = {
        ...orchestrator.files,
        [file.filename]: file
    };

    compileFile(orchestrator.files[file.filename]);
}

export function setActiveFile(name: string) {
    orchestrator.activeFilename = name;
}

/**
 * Remove a file from the orchestrator
 *
 * @param name Name of file to remove
 */
export function removeFile(name: string) {
    delete orchestrator.files[name];
    setTimeout(() => setActiveFile('App.vue'), 0);
}

/**
 * Remove all files from the orchestrator
 */
export function removeAllFiles() {
    orchestrator.files = {};
}

/**
 * Load a demo folder
 *
 * @param name Name of demo to open
 */
// export async function openDemo(name: string) {
//   // Get all modules from demo
//   const modules = (await Promise.all(Object.entries(demos)
//     .filter(([path]) => path.split('demos/')[1].split('/')[0] === name)
//     .filter(([path]) => path.includes('.vue') || path.includes('.json'))
//     .map(async([path]) => ([path, (await import(`${path}?raw`)).default]))))

//   console.log(modules)

//   const packages = (await Promise.all(Object.entries(demos)
//     .filter(([path]) => path.split('demos/')[1].split('/')[0] === name)
//     .filter(([path]) => path.includes('.json'))
//     .map(async([path, imp]) => ([path, (await imp()).default]))))
//     .find(([path]) => path.includes('packages.json'))

//   if (packages)
//     orchestrator.packages = packages[1]

//   removeAllFiles()

//   // Load Vue Files
//   modules
//     .filter(([path]) => path.includes('.vue'))
//     .map(([path, content]) => {
//       const { descriptor: { template, scriptSetup } } = parse(content)
//       return {
//         filename: path.split(`${name}/`)[1],
//         script: scriptSetup?.content.trim(),
//         template: template?.content.trim(),
//       }
//     })
//     .forEach(({ filename, script, template }) => {
//       addFile(new OrchestratorFile(filename, template, script))
//     })

//   setActiveFile('App.vue')
//   shouldUpdateContent.trigger(null)
// }

export const onShouldUpdateContent: EventHookOn = shouldUpdateContent.on;

const initialPackages = [
    // {
    //     name: 'vue-demi',
    //     source: 'unpkg',
    //     description: 'Vue Demi (half in French) is a developing utility allows you to write Universal Vue Libraries for Vue 2 & 3',
    //     url: 'https://unpkg.com/vue-demi/lib/index.mjs'
    // },
    {
        name: '@vueuse/shared',
        source: 'unpkg',
        description: 'Shared VueUse utilities.',
        url: 'https://unpkg.com/@vueuse/shared@5.0.1/index.esm.js'
    },
    {
        name: '@vueuse/core',
        source: 'unpkg',
        description: 'Collection of essential Vue Composition Utilities',
        url: 'https://unpkg.com/@vueuse/core@5.0.1/index.esm.js'
    },
    {
        name: 'meetcode-ui',
        url: '/dist/meetcode-ui.esm.js'
    },
    {
        name: 'naive-ui',
        url: '/playground/source/naive-ui-dev-proxy'
    }
];

export function loadInitialState() {
    removeAllFiles();
    const params = new URLSearchParams(location.search);
    const code = <string>params.get('code');
    if (!code) return;

    const { script = '', template = '' } = InitialCode[code];

    orchestrator.packages = initialPackages;
    addFile(new OrchestratorFile('App.vue', template.trim(), script.trim()));
    setActiveFile('App.vue');
    shouldUpdateContent.trigger(null);
}
