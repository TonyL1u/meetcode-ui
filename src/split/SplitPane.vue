<script lang="ts">
import { SplitPaneIKey } from './interface';
export default {
    name: 'SplitPane',
    iKey: SplitPaneIKey
};
</script>

<script lang="ts" setup>
import { createVNode, useSlots, renderSlot } from 'vue';

const slots = useSlots();

const Render = () => {
    return createVNode(
        'div',
        {
            class: 'mc-split-pane'
        },
        [renderSlot(slots, 'default')]
    );
};
</script>

<template>
    <Render />
</template>
