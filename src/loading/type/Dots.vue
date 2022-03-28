<template>
    <div class="mc-loading--dots mc-flex" :style="cssVars">
        <div class="dot" style="--delay: 0s"></div>
        <div class="dot" style="--delay: 0.1s"></div>
        <div class="dot" style="--delay: 0.2s"></div>
        <div class="dot" style="--delay: 0.3s"></div>
    </div>
</template>

<script lang="ts" setup>
const { loadingHeight, dotWidth, color } = defineProps<{ loadingHeight?: number; dotWidth?: number; color?: string }>();

const cssVars: any = {
    '--loading-height': loadingHeight + 'px',
    '--dot-width': dotWidth + 'px',
    '--dot-color': color
};
</script>
