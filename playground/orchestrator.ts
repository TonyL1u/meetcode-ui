import { reactive, watch, watchEffect } from 'vue';
import { createEventHook, EventHookOn } from '@vueuse/core';
import { compileFile } from './compiler/sfcCompiler';

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
        url: '/lib/meetcode-ui.esm.js'
    },
    {
        name: 'naive-ui',
        url: '/playground/source/naive-ui-dev-proxy'
    }
];

export async function loadInitialState(filePath: string = '') {
    removeAllFiles();
    const demoFile = <string>(await import(/* @vite-ignore */ `${filePath}?raw`)).default;
    const [templateStartIndex, templateEndIndex] = [demoFile.indexOf('<template>'), demoFile.lastIndexOf('</template>')];
    const template = demoFile.slice(templateStartIndex + 10, templateEndIndex);
    const script = demoFile.match(/<script lang="ts" setup>([\s\S]*?)<\/script>/)?.[1] ?? '';

    orchestrator.packages = initialPackages;
    addFile(new OrchestratorFile('App.vue', template.trim(), script.trim()));
    setActiveFile('App.vue');
    shouldUpdateContent.trigger(null);
}
