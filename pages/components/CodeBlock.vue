<script lang="ts" setup>
import { ref } from 'vue';
import { McButton, McIcon, McTooltip } from 'meetcode-ui';
import { CopyOutline as IconCopy, CheckmarkOutline as IconCheck } from '@vicons/ionicons5';
import { useClipboard } from '@vueuse/core';
import lz from 'lz-string';

const props = defineProps<{ lang: string; code: string }>();
const hasCopied = ref(false);

const handleCopy = () => {
    if (hasCopied.value) return;

    const { copy } = useClipboard();
    const code = lz.decompressFromEncodedURIComponent(props.code);
    if (code) {
        copy(code);
        hasCopied.value = true;

        setTimeout(() => {
            hasCopied.value = false;
        }, 2000);
    }
};
</script>

<template>
    <div :class="`language-${props.lang}`">
        <McTooltip v-model:show="hasCopied" trigger="manual" content="已复制" placement="left">
            <McButton class="copy-btn mc-top-1 mc-right-1 mc-opacity-0" style="position: absolute" render="text" size="mini" circle @click="handleCopy">
                <template #icon>
                    <McIcon v-if="hasCopied" color="#00bf80" :size="14">
                        <IconCheck />
                    </McIcon>
                    <McIcon v-else color="#888" :size="14">
                        <IconCopy />
                    </McIcon>
                </template>
            </McButton>
        </McTooltip>
        <slot></slot>
    </div>
</template>
