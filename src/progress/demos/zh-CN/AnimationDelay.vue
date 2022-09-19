<template>
    <div style="position: relative; height: 128px; width: 128px">
        <McProgress
            v-for="({ color, size }, index) in items"
            :style="{ position: 'absolute', top: `${9 * index}px`, left: `${9 * index}px` }"
            type="circle"
            :color="color"
            :size="size"
            :start="100 - 25 * index"
            :end="0"
            :duration="duration"
            :delay="(duration / 4) * index"
            :show-indicator="false"
            animation
            loop
        />
    </div>
</template>

<script lang="ts" setup>
import { McProgress } from 'meetcode-ui';

const duration = 4000;
const items = [
    {
        size: 128,
        color: '#16a34a'
    },
    {
        size: 110,
        color: '#3b82f6'
    },
    {
        size: 92,
        color: '#fb923c'
    },
    {
        size: 74,
        color: '#dc2626'
    }
];
</script>
