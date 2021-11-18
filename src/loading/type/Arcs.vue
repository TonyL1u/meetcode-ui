<template>
    <div class="mc-loading--arcs" :style="cssVars">
        <div class="arc"></div>
        <div class="arc"></div>
        <div class="arc"></div>
    </div>
</template>

<script lang="ts" setup>
// open source: https://codepen.io/alphardex/pen/JjYVoqm
const { arcSize, color } = defineProps<{ arcSize?: number; color?: string }>();

const cssVars: any = {
    '--arc-size': arcSize + 'px',
    '--arc-color': color
};
</script>
