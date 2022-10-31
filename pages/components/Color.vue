<script lang="ts" setup>
import { McMessage, McGrid, McGridItem } from 'meetcode-ui';
import { useClipboard } from '@vueuse/core';
import { ColorPalette } from '@/_color_';

const { title, themeColor, palette } = defineProps<{ title: string; themeColor: string; palette: string[] }>();
console.log(palette);
const { copy } = useClipboard();
const handleClick = async (color: string) => {
    await copy(color);
    McMessage.success({
        card: true,
        html: `复制成功<span class="mc-px-2 mc-py-1 mc-rounded mc-ml-2" style="background: ${ColorPalette.GRAY[10]}; border: 1px ${ColorPalette.GRAY[9]} solid">${color}</span>`
    });
};
</script>

<template>
    <div class="mc-flex">
        <div class="mc-flex mc-p-3 mc-rounded-lg mc-items-center mc-cursor-pointer key-color" :style="{ border: `1px ${ColorPalette.GRAY[9]} solid`, '--theme-color': themeColor }" @click="handleClick(themeColor)">
            <div class="mc-rounded-full mc-z-[1] color" :style="{ background: themeColor }"></div>
            <div class="mc-flex mc-flex-col mc-w-20 mc-z-[2] color-info">
                <span class="mc-capitalize">{{ title }}</span>
                <span :style="{ color: ColorPalette.GRAY[7] }">{{ themeColor }}</span>
            </div>
        </div>
        <McGrid :auto-columns="['40px', '1fr']" :gap="12" class="mc-flex-1 mc-ml-10">
            <McGridItem v-for="(color, index) in palette" @click="handleClick(color)">
                <div class="mc-w-full mc-text-xs mc-cursor-pointer">
                    <div class="mc-rounded-xl mc-h-10" :style="{ background: color }"></div>
                    <div class="mc-my-1">{{ (index + 1) * 100 }}</div>
                    <div :style="{ color: ColorPalette.GRAY[7] }">{{ color }}</div>
                </div>
            </McGridItem>
        </McGrid>
    </div>
</template>

<style lang="scss" scoped>
.key-color {
    overflow: hidden;
    position: relative;
    height: max-content;
    transition: 0.2s ease-in-out 0.1s;

    .color {
        transition: 0.5s ease-in-out;
        position: absolute;
        width: 40px;
        height: 40px;
        z-index: 1;
        transform-origin: 50% 50%;
    }

    .color-info {
        margin-left: 52px;

        span {
            transition: 0.2s ease-in-out 0.1s;
        }
    }

    &:hover {
        border-color: var(--theme-color) !important;
    }

    &:hover .color {
        scale: 6;
    }

    &:hover .color-info {
        span {
            color: white !important;
            transform: translateX(-52px);
        }
    }
}
</style>
