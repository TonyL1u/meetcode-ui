<template>
    <div class="code-demo">
        <div class="demo-box">
            <slot></slot>
        </div>
        <div class="code-preview-box" v-if="codePreviewVisiable">
            <NTabs type="line" :default-value="tabIndex" :tab-pad="36" :content-style="{ 'padding-top': 0 }" @update:value="handleUpdateTab">
                <NTabPane v-for="(code, index) in codes" :name="index" :tab="code.name + '.vue'" style="padding-top: 0; overflow: auto">
                    <pre class="code-preview language-html" v-html="highlighted(code.importSource)"></pre>
                </NTabPane>
            </NTabs>
        </div>
        <div v-if="showToolbox" class="tool-box" :class="!codePreviewVisiable ? 'mc-mt-3.5' : ''">
            <NSpace justify="center">
                <NTooltip placement="top" trigger="hover">
                    <template #trigger>
                        <NButton text class="toolbox-btn" @click="copyCode">
                            <NIcon>
                                <IconCopy />
                            </NIcon>
                        </NButton>
                    </template>
                    <span>复制代码</span>
                </NTooltip>
                <NTooltip placement="top" trigger="hover">
                    <template #trigger>
                        <NButton text class="toolbox-btn" @click="codePreviewVisiable = !codePreviewVisiable">
                            <NIcon>
                                <IconCode />
                            </NIcon>
                        </NButton>
                    </template>
                    <span v-if="codePreviewVisiable">隐藏代码</span>
                    <span v-else>展开代码</span>
                </NTooltip>
                <NTooltip placement="top" trigger="hover">
                    <template #trigger>
                        <NButton text class="toolbox-btn" @click="handleShowModal">
                            <NIcon>
                                <IconEdit />
                            </NIcon>
                        </NButton>
                    </template>
                    <span>在线运行</span>
                </NTooltip>
            </NSpace>
        </div>
    </div>

    <NModal v-model:show="showModal">
        <NCard style="width: 60%; height: 60vh; min-width: 1280px; min-height: 768px" :bordered="false" :content-style="{ height: '100%' }">
            <Playground />
        </NCard>
    </NModal>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import hljs from 'highlight.js';
import { NButton, NCard, NIcon, NSpace, NModal, useNotification, NTooltip, NTabs, NTabPane } from 'naive-ui';
import { Code as IconCode, CopyOutline as IconCopy, CubeOutline as IconEdit } from '@vicons/ionicons5';
import { useClipboard } from '@vueuse/core';
import Playground from '@playground/Playground.vue';
import { loadInitialState } from '@playground/orchestrator';

const props = defineProps<{ codeSources: string }>();

const codes = ref<Array<any>>(JSON.parse(props.codeSources) || []);
const codePreviewVisiable = ref(false);
const showModal = ref(false);
const tabIndex = ref(0);
const notification = useNotification();
const { copy } = useClipboard();

const showToolbox = computed(() => {
    return codes.value.length > 0;
});
const handleUpdateTab = (val: string | number) => {
    tabIndex.value = <number>val;
};
const handleShowModal = () => {
    setTimeout(() => {
        loadInitialState(codes.value[tabIndex.value].filePath);
        showModal.value = true;
    }, 0);
};
const highlighted = (content: string) => {
    return hljs.highlight(content, { language: 'html' }).value;
};
const copyCode = () => {
    const code = codes.value[tabIndex.value];
    copy(code.importSource);
    notification.success({
        content: '复制成功',
        meta: `${code.name}.vue代码已复制到剪贴板`,
        duration: 2000,
        closable: true
    });
};
</script>
<style lang="scss" scoped>
.code-demo {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    position: relative;
    padding: 12px;
    margin: 12px 0;
    overflow: auto;
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

    .n-space {
        position: relative;
        top: 8px;
    }

    .toolbox-btn {
        font-size: 12px;
        color: #9ea4aa;
    }
}
</style>
