<template>
    <McGrid :gap="8" :auto-columns="['64px', '1fr']" autofill>
        <McGridItem v-for="color in colors" class="color-item mc-h-16 mc-rounded-md mc-overflow-hidden" :class="color.cls">
            <div class="copy-wrapper mc-hidden mc-flex-col mc-justify-evenly mc-items-center mc-h-full mc-w-full mc-text-xs mc-bg-black mc-text-white mc-bg-opacity-50">
                <span class="mc-cursor-pointer" @click="handleClick(color.cls)">{{ color.value }}</span>
                <span class="mc-cursor-pointer" @click="handleClick(color.hex)">{{ color.hex }}</span>
            </div>
        </McGridItem>
    </McGrid>
</template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui';
import { McGrid, McGridItem } from 'meetcode-ui';
import { useClipboard } from '@vueuse/core';

interface Color {
    cls: string;
    value: string;
    hex: string;
}
defineProps<{ colors: Array<Color> }>();

const { copy } = useClipboard();
const message = useMessage();
const handleClick = (value: string) => {
    copy(value);
    message.success(`${value} 已复制`, {
        duration: 1500
    });
};
</script>

<style lang="scss" scoped>
.color-item {
    &:hover .copy-wrapper {
        display: flex;
        animation: slide-up 0.2s ease-in-out forwards;
    }
}

@keyframes slide-up {
    from {
        transform: translateY(64px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
