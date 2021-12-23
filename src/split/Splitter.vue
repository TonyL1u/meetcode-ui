<script lang="ts">
export default {
    name: 'Splitter'
};
</script>

<script lang="ts" setup>
import { computed, toRefs, useSlots, createVNode, renderSlot } from 'vue';
import { flatten, SpecificVNode } from '../_utils_';
import { SplitPaneIKey } from './interface';

interface Props {
    horizontal?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    horizontal: false
});

const slots = useSlots();
const { horizontal } = toRefs(props);

const handleMouseenter = () => {
    console.log(12345);
};

const splitterMarkerVNode = computed(() => {
    return createVNode('div', { class: 'mc-splitter__marker' });
});

const Render = () => {
    return createVNode('div', { class: 'mc-splitter', onMouseenter: handleMouseenter }, [splitterMarkerVNode.value]);
};
</script>

<template>
    <Render />
</template>
