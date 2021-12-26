<script lang="ts">
import { SplitPaneIKey } from './interface';
export default {
    name: 'SplitPane',
    iKey: SplitPaneIKey
};
</script>

<script lang="ts" setup>
import { ref, createVNode, useSlots, renderSlot, inject } from 'vue';
import { createKey } from '../_utils_';
import { splitInjectionKey } from './interface';

const slots = useSlots();
const key = createKey('split-pane');
const { parentWidth, BusResize } = inject(splitInjectionKey, null) ?? {};

const updateSize = (dragSize: number) => {
    console.log(dragSize);
    if (parentWidth?.value) {
        // widthPercentage.value += 1;
    }
};

if (BusResize) {
    BusResize.on(updateSize);
}

const Render = () => {
    return createVNode(
        'div',
        {
            class: 'mc-split-pane',
            'data-key': key
        },
        [renderSlot(slots, 'default')]
    );
};
</script>

<template>
    <Render />
</template>
