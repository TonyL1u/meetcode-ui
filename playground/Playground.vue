<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import Editor from './Editor.vue';
import Preview from './Preview.vue';
import { Splitpanes, Pane } from 'splitpanes';
import { onShouldUpdateContent, orchestrator } from './orchestrator';
import { useThemeController } from 'meetcode-ui';
import hljs from 'highlight.js';

const emit = defineEmits<(e: 'renderFinished') => void>();
const { current: siteTheme } = useThemeController();
const initialScript = ref('');
const initialTemplate = ref('');
const compliedScript = ref('');

const onContentChanged = (source: string, content: string) => {
    if (orchestrator.activeFile) {
        if (source === 'script') orchestrator.activeFile.script = content;
        else if (source === 'template') orchestrator.activeFile.template = content;
        compliedScript.value = orchestrator.activeFile?.compiled.js;
    }
};

const handleRenderFinished = () => emit('renderFinished');

onShouldUpdateContent(() => {
    if (orchestrator.activeFile) {
        initialScript.value = orchestrator.activeFile?.script;
        initialTemplate.value = orchestrator.activeFile?.template;
        compliedScript.value = orchestrator.activeFile?.compiled.js;
    }
});
</script>

<template>
    <Splitpanes class="default-theme mc-p-4 mc-flex mc-box-border mc-h-full" :class="siteTheme">
        <Pane class="mc-h-full">
            <Splitpanes class="default-theme mc-flex mc-flex-col mc-h-full" horizontal>
                <Pane>
                    <div class="container">
                        <Editor language="javascript" :value="initialScript" @change="content => onContentChanged('script', content)" />
                    </div>
                </Pane>
                <Pane>
                    <div class="container">
                        <Editor language="html" :value="initialTemplate" @change="content => onContentChanged('template', content)" />
                    </div>
                </Pane>
            </Splitpanes>
        </Pane>
        <Pane class="mc-h-full">
            <div class="container" style="background: #f2f2f2">
                <Preview @render-finished="handleRenderFinished" />
            </div>
        </Pane>
    </Splitpanes>
</template>

<style lang="scss">
.splitpanes.default-theme .splitpanes__pane {
    @apply mc-bg-transparent mc-overflow-hidden;

    & > .container {
        @apply mc-rounded mc-h-full mc-overflow-hidden mc-box-border mc-flex;
        border: 1px solid #e5e7eb;
    }
}

.splitpanes.default-theme.dark .splitpanes__pane {
    & > .container {
        border: 1px solid #9ca3af;
    }
}

.splitpanes.default-theme .splitpanes__splitter {
    @apply mc-border-transparent mc-flex mc-overflow-hidden;
    min-width: 16px;
    min-height: 16px;
}

.splitpanes.default-theme.splitpanes--horizontal > .splitpanes__splitter {
    @apply mc-flex-col mc-items-center;
    cursor: row-resize;
    &::after,
    &::before {
        @apply mc-bg-gray-400;
        content: '';
        width: 30px;
        height: 1px;
        transition: 0.4s;
    }

    &::before {
        margin-top: 5px;
    }

    &::after {
        @apply mc-mt-1;
    }
}

.splitpanes.default-theme.splitpanes--vertical > .splitpanes__splitter {
    @apply mc-items-center;
    cursor: col-resize;
    &::after,
    &::before {
        @apply mc-bg-gray-400;
        content: '';
        width: 1px;
        height: 30px;
        transition: 0.4s;
    }

    &::before {
        margin-left: 5px;
    }

    &::after {
        @apply mc-ml-1;
    }
}

.splitpanes.default-theme .splitpanes__splitter:hover::before,
.splitpanes.default-theme .splitpanes__splitter:hover::after {
    @apply mc-bg-white;
}
</style>
