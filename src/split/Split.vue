<script lang="ts">
import { SplitIKey } from './interface';
export default {
    name: 'Split',
    iKey: SplitIKey
};
</script>

<script lang="ts" setup>
import { computed, toRefs, useSlots, createVNode, renderSlot } from 'vue';
import { flatten, SpecificVNode } from '../_utils_';
import McSplitter from './Splitter.vue';
import { SplitPaneIKey, SplitElement, SplitterProps } from './interface';

interface Props {
    horizontal?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    horizontal: false
});

const slots = useSlots();
const { horizontal } = toRefs(props);
const originalSplits = slots.default ? flatten<SplitElement>(slots.default(), [SplitIKey, SplitPaneIKey]) : [];

const s = computed(() => {
    const splitters: SpecificVNode<SplitterProps>[] = new Array(originalSplits.length - 1).fill(null).map(() => createVNode(McSplitter, null, []));
    return new Array(2 * originalSplits.length - 1).fill(null).map((e, index) => {
        if (index % 2 === 0) return originalSplits[index >> 1];
        return splitters[(index - 1) >> 1];
    });
});

const Render = () => {
    console.log(s.value);
    return createVNode(
        'div',
        {
            class: 'mc-splitter'
        },
        [renderSlot(slots, 'default')]
    );
};
</script>

<template>
    <Render />
</template>
