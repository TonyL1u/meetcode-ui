<template>
    <div class="mc-loading--ripple" :style="cssVars"></div>
</template>

<script lang="ts" setup>
const { width, color } = defineProps<{ width?: number; color?: string }>();

const cssVars: any = {
    '--ripple-width': width + 'px',
    '--ripple-color': color
};
</script>
