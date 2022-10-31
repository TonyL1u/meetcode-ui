<script lang="ts" setup>
import { ColorPalette, ThemeColor } from '@/_color_';

// console.log(ColorPalette.GREEN);
// console.log(ThemeColor.INFO);
const series = (index: number) => Object.values(ColorPalette).map(color => color[index]);
const points = ['50% 0%', '100% 0', '100% 50%', '100% 100%', '50% 100%', '0% 100%', '0% 50%', '0% 0%'];
</script>

<template>
    <div v-for="colors in ColorPalette">
        <div v-for="color in colors" class="mc-w-20 mc-h-20" :style="{ background: color }"></div>
    </div>
</template>

<style lang="scss">
.round {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: #00b4c8;
    // transition: 0.2s;
    // transform-origin: 25% 25%;
    clip-path: var(--path-point);
    cursor: pointer;
    animation: appear ease-in-out both;

    &:hover {
        transform: scale(1.1);
    }
}

@keyframes appear {
    from {
        transform: scale(0);
    }

    to {
        transform: scale(1);
    }
}
</style>
