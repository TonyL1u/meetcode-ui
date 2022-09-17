<template>
    <div style="position: relative; height: 128px; width: 128px">
        <McProgress
            v-for="(size, index) in sizes"
            :style="{ position: 'absolute', top: `${9 * index}px`, left: `${9 * index}px` }"
            type="circle"
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
const sizes = [128, 110, 92, 74];
</script>
