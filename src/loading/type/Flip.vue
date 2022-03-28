<template>
    <div class="mc-loading--flip" :style="cssVars"></div>
</template>

<script lang="ts" setup>
// open source: https://github.com/tobiasahlin/SpinKit
const { flipWidth, color } = defineProps<{ flipWidth?: number; color?: string }>();

const cssVars: any = {
    '--flip-width': flipWidth + 'px',
    '--flip-color': color
};
</script>
