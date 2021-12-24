<script lang="ts">
import { SplitPaneIKey } from './interface';
export default {
    name: 'SplitPane',
    iKey: SplitPaneIKey
};
</script>

<script lang="ts" setup>
import { ref, createVNode, useSlots, renderSlot, inject } from 'vue';
import { splitInjectionKey } from './interface';

const slots = useSlots();
const { parentWidth, BusResize } = inject(splitInjectionKey, null) ?? {};
const widthPercentage = ref(50);

const updateSize = (dragSize: number) => {
    console.log(dragSize);
    if (parentWidth?.value) {
        widthPercentage.value += 1;
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
            style: { width: `${widthPercentage.value}%` }
        },
        [renderSlot(slots, 'default')]
    );
};
</script>

<template>
    <Render />
</template>
