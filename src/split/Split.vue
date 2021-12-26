<script lang="ts">
import { SplitIKey } from './interface';
export default {
    name: 'Split',
    iKey: SplitIKey
};
</script>

<script lang="ts" setup>
import { ref, computed, toRefs, useSlots, createVNode, provide } from 'vue';
import { useElementBounding, useEventBus } from '@vueuse/core';
import { flatten, SpecificVNode, createKey } from '../_utils_';
import McSplitter from './Splitter.vue';
import { splitInjectionKey, SplitPaneIKey, SplitPaneProps, SplitterProps } from './interface';
import * as CSS from 'csstype';

interface Props {
    horizontal?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    horizontal: false
});

const slots = useSlots();
const key = createKey('split');
const { horizontal } = toRefs(props);
const splitElRef = ref<HTMLElement>();
const { width } = useElementBounding(splitElRef);
const splitPaneInitialWidth = ref<string>('0');
const cssVars = computed<CSS.Properties>(() => {
    return {
        '--split-pane-initial-width': `${splitPaneInitialWidth.value}%`
    };
});

const splitsVNode = computed(() => {
    const splitPanes = slots.default ? flatten<SplitPaneProps>(slots.default(), SplitPaneIKey) : null;

    if (!splitPanes) return null;
    splitPaneInitialWidth.value = (100 / splitPanes.length).toFixed(1);
    const splitters: SpecificVNode<SplitterProps>[] = new Array(splitPanes.length - 1).fill(null).map(() => createVNode(McSplitter));
    return new Array(2 * splitPanes.length - 1).fill(null).map((e, index) => {
        if (index % 2 === 0) return splitPanes[index >> 1];
        return splitters[(index - 1) >> 1];
    });
});

const BusResize = useEventBus<number>(key + 'resize');

provide(splitInjectionKey, {
    parentWidth: width,
    BusResize
});

const Render = () => {
    return createVNode(
        'div',
        {
            ref: splitElRef,
            class: ['mc-split', horizontal.value ? 'mc-split--horizontal' : 'mc-split--vertical'],
            style: cssVars.value
        },
        [splitsVNode.value]
    );
};
</script>

<template>
    <Render />
</template>
