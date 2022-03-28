<template>
    <div class="code-demo" :style="{ paddingBottom: showToolbox ? '0px' : '12px' }">
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
                        <McIcon :size="12">
                            <IconCode />
                        </McIcon>
                    </template>
                </McButton>
            </McTooltip>
            <McTooltip content="在线运行">
                <McButton render="text" size="mini" @click="handleShowModal">
                    <template #icon>
                        <McIcon :size="12">
                            <IconEdit />
                        </McIcon>
                    </template>
                </McButton>
            </McTooltip>
        </McSpace>
    </div>

    <McModal v-model:show="showModal" :appear-from-cursor="false" pure :body-style="{ height: '75vh', width: '75vw', minWidth: '1280px', minHeight: '768px', padding: '8px', boxSizing: 'border-box' }">
        <Playground />
    </McModal>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import hljs from 'highlight.js';
import { useNotification } from 'naive-ui';
import { McTooltip, McTabs, McTabPane, McModal, McButton, McIcon, McSpace, McMessage } from 'meetcode-ui';
import { Code as IconCode, CopyOutline as IconCopy, CubeOutline as IconEdit } from '@vicons/ionicons5';
import { useClipboard } from '@vueuse/core';
import Playground from '@playground/Playground.vue';
import { loadInitialState } from '@playground/orchestrator';

const props = defineProps<{ codeSources: string }>();
const codes = ref<Array<any>>(JSON.parse(props.codeSources) || []);
const codePreviewVisible = ref(false);
const showModal = ref(false);
const tabIndex = ref(0);
const notification = useNotification();
const { copy } = useClipboard();

const showToolbox = computed(() => {
    return codes.value.length > 0;
});
const handleShowModal = () => {
    setTimeout(() => {
        loadInitialState(codes.value[tabIndex.value].compressedSource);
        showModal.value = true;
    }, 0);
};
const highlighted = (content: string) => {
    return hljs.highlight(content, { language: 'html' }).value;
};
const copyCode = () => {
    const code = codes.value[tabIndex.value];
    copy(code.importSource);
    McMessage.success(`${code.name}.vue代码已复制到剪贴板`, { card: true });
    notification.success({
        content: '复制成功',
        meta: `${code.name}.vue代码已复制`,
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
    margin: 16px 0;
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
}
</style>
