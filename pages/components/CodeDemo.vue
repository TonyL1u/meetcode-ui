<template>
    <div class="code-demo" :style="{ borderColor: isHashed ? '#16a34a' : '' }">
        <div class="demo-box">
            <slot></slot>
        </div>
        <McTabs v-if="codePreviewVisible" v-model:value="tabIndex" :tab-gap="36" :content-style="{ 'padding-top': 0 }">
            <McTabPane v-for="(code, index) in codes" :name="index" :tab-label="code.name + '.vue'">
                <pre class="code-preview language-html" v-html="highlighted(code.importSource)"></pre>
            </McTabPane>
        </McTabs>
        <McSpace v-if="showToolbox" :class="['tool-box', !codePreviewVisible ? 'mc-mt-3' : '']" justify="center">
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
import { McTooltip, McTabs, McTabPane, McButton, McIcon, McSpace, McMessage, McPopup } from 'meetcode-ui';
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
    importSource: string;
    compressedSource: string;
}
const props = defineProps<{ codeSources?: string; hash?: string }>();
const codes: CodeSource[] = props.codeSources ? JSON.parse(props.codeSources) : [];
const showToolbox = codes.length > 0;
const codePreviewVisible = ref(false);
const tabIndex = ref(0);
const isHashed = ref(false);
const currentCode = computed(() => codes[tabIndex.value]);
const { copy } = useClipboard();
const { onRouteChange } = useRouterEventHook();
const handleEditOnGithub = () => {
    window.open(`${repository.url}/blob/develop/${currentCode.value.path}`);
};
const handleShowModal = () => {
    loadInitialState(currentCode.value.compressedSource);
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
    const { importSource, name } = currentCode.value;
    copy(importSource);
    McMessage.success(`${name}.vue代码已复制到剪贴板`, { card: true });
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

:deep(pre.code-preview) {
    position: relative;
    padding: 0;
    font-family: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace;

    code > span.token.tag:first-of-type {
        position: absolute;
        left: 1em;
    }
}

.tool-box {
    border-top: 1px solid #e4e7ed;
    transition: background 0.2s, border-color 0.2s;
}
</style>
