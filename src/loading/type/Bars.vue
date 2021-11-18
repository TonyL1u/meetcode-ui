<template>
    <div class="mc-loading--bars" :style="cssVars">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    </div>
</template>
<script lang="ts" setup>
// open source: https://codepen.io/alphardex/pen/abzaxBB
const { loadingWidth, color } = defineProps<{ loadingWidth?: number; color?: string }>();

const cssVars: any = {
    '--loading-width': loadingWidth + 'px',
    '--bar-color': color
};
</script>
