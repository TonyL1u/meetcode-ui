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
import { SplitPaneIKey, SplitPaneProps, SplitterProps } from './interface';

interface Props {
    horizontal?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    horizontal: false
});

const slots = useSlots();
const { horizontal } = toRefs(props);

const splitsVNode = computed(() => {
    const originalSplits = slots.default ? flatten<SplitPaneProps>(slots.default(), SplitPaneIKey) : [];
    const splitters: SpecificVNode<SplitterProps>[] = new Array(originalSplits.length - 1).fill(null).map(() => createVNode(McSplitter));
    return new Array(2 * originalSplits.length - 1).fill(null).map((e, index) => {
        if (index % 2 === 0) return originalSplits[index >> 1];
        return splitters[(index - 1) >> 1];
    });
});

const Render = () => {
    return createVNode(
        'div',
        {
            class: ['mc-split', horizontal.value ? 'mc-split--horizontal' : 'mc-split--vertical']
        },
        [splitsVNode.value]
    );
};
</script>

<template>
    <Render />
</template>
