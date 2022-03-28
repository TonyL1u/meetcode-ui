<template>
    <div class="mc-loading--rings" :style="cssVars">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>
</template>

<script lang="ts" setup>
// open source: https://epic-spinners.epicmax.co/#/
const { ringSize, ringPadding, color } = defineProps<{ ringSize?: number; ringPadding?: number; color?: string }>();

const cssVars: any = {
    '--ring-size': ringSize + 'px',
    '--ring-padding': ringPadding + 'px',
    '--ring-color': color
};
</script>
