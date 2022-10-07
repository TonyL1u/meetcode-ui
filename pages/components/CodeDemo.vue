<template>
    <div class="code-demo" :style="{ borderColor: isHashed ? '#16a34a' : '' }">
        <div class="demo-box">
            <slot></slot>
        </div>
        <pre v-if="codePreviewVisible" class="code-preview language-html" v-html="highlighted(code.source)"></pre>
        <McSpace v-if="code" :class="['tool-box', !codePreviewVisible ? 'mc-mt-3' : '']" justify="center">
            <McTooltip content="复制代码">
                <McButton render="text" size="mini" @click="copyCode">
                    <template #icon>
                        <McIcon :size="12">
                            <IconCopy />
                        </McIcon>
                    </template>
                </McButton>
            </McTooltip>
            <McTooltip :content="codePreviewVisible ? '隐藏代码' : '展开代码'">
                <McButton render="text" size="mini" @click="codePreviewVisible = !codePreviewVisible">
                    <template #icon>
                        <McIcon :icon="codePreviewVisible ? IconCodeSlash : IconCode" :size="12" />
                    </template>
                </McButton>
            </McTooltip>
            <McTooltip content="在 Github 上编辑">
                <McButton render="text" size="mini" @click="handleEditOnGithub">
                    <template #icon>
                        <McIcon :size="12">
                            <IconEdit />
                        </McIcon>
                    </template>
                </McButton>
            </McTooltip>
            <McTooltip content="在线运行">
                <McButton render="text" size="mini" @click="handleShowModal">
                    <template #icon>
                        <McIcon :size="12">
                            <IconRunning />
                        </McIcon>
                    </template>
                </McButton>
            </McTooltip>
        </McSpace>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { McTooltip, McButton, McIcon, McSpace, McMessage, McPopup } from 'meetcode-ui';
import { Code as IconCode, CodeSlash as IconCodeSlash, CopyOutline as IconCopy, CubeOutline as IconRunning, CreateOutline as IconEdit } from '@vicons/ionicons5';
import { useClipboard } from '@vueuse/core';
import { useRouterEventHook } from '../utils';
import { loadInitialState } from '@playground/orchestrator';
import hljs from 'highlight.js';
import Playground from './functional/playground';
import { repository } from '../../package.json';

interface CodeSource {
    name: string;
    path: string;
    source: string;
    compressedSource: string;
}
const props = defineProps<{ codeSources?: string; hash?: string }>();
const code = computed<CodeSource>(() => (props.codeSources ? JSON.parse(props.codeSources) : null));
const codePreviewVisible = ref(false);
const isHashed = ref(false);
const { copy } = useClipboard();
const { onRouteChange } = useRouterEventHook();
const handleEditOnGithub = () => {
    window.open(`${repository.url}/blob/develop/${code.value.path}`);
};
const handleShowModal = () => {
    loadInitialState(code.value.compressedSource);
    const isLoading = ref(true);
    const { show } = McPopup(Playground, {
        props: { isLoading },
        on: {
            cancelLoading: () => {
                isLoading.value = false;
            }
        }
    });
    show({
        style: 'border-radius: 8px',
        pure: true,
        bodyStyle: { height: '75vh', width: '75vw', minWidth: '1280px', minHeight: '768px', padding: '8px', boxSizing: 'border-box' },
        onAfterLeave: () => {
            isLoading.value = true;
        }
    });
};
const highlighted = (content: string) => {
    return hljs.highlight(content, { language: 'html' }).value;
};
const copyCode = () => {
    const { source } = code.value;
    copy(source);
    McMessage.success('已复制', { card: true });
};

onRouteChange(
    'hash',
    ({ hash }) => {
        isHashed.value = !!(hash && hash.slice(1) === props.hash);
    },
    { immediate: true }
);
</script>

<style lang="scss" scoped>
.code-demo {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    position: relative;
    padding: 12px;
    padding-bottom: 0px;
    margin-bottom: 18px;
    overflow: auto;
    transition: background 0.2s, border-color 0.2s;
}

:deep(.demo-box) {
    & > *:first-child {
        margin-top: 0;
    }
}

pre.code-preview {
    position: relative;
    padding-top: 1em;
    margin: 0.75rem 0;
    font-family: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace;
    border-top: 1px solid #e4e7ed;
    overflow: auto;
}

.tool-box {
    border-top: 1px solid #e4e7ed;
    transition: background 0.2s, border-color 0.2s;
}
</style>
