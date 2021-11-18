<template>
    <div class="mc-loading--spin" :style="{ color: stroke }">
        <svg :viewBox="`0 0 ${2 * scaledRadius} ${2 * scaledRadius}`" xmlns="http://www.w3.org/2000/svg">
            <g>
                <animateTransform attributeName="transform" type="rotate" :values="`0 ${scaledRadius} ${scaledRadius};270 ${scaledRadius} ${scaledRadius}`" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite" />
                <circle fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" :cx="scaledRadius" :cy="scaledRadius" :r="radius - strokeWidth / 2" :stroke-dasharray="5.67 * radius" :stroke-dashoffset="18.48 * radius">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        :values="`0 ${scaledRadius} ${scaledRadius};135 ${scaledRadius} ${scaledRadius};450 ${scaledRadius} ${scaledRadius}`"
                        begin="0s"
                        dur="1.4s"
                        fill="freeze"
                        repeatCount="indefinite"
                    />
                    <animate attributeName="stroke-dashoffset" :values="`${5.67 * radius};${1.42 * radius};${5.67 * radius}`" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite" />
                </circle>
            </g>
        </svg>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
    scale?: number;
    radius?: number;
    strokeWidth?: number;
    stroke?: string;
}

const { radius, scale } = withDefaults(defineProps<Props>(), {
    scale: 1,
    radius: 100,
    strokeWidth: 28,
    stroke: '#10B981'
});

const scaledRadius = computed(() => {
    return radius / scale;
});
</script>
