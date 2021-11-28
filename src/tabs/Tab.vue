<script lang="ts">
export default {
    name: 'Tab',
    iKey: tabIKey
};
</script>

<script lang="ts" setup>
import { useSlots, inject, createVNode, renderSlot } from 'vue';
import { tabsInjectionKey, tabIKey } from './interface';

interface Props {
    name?: string | number;
}
defineProps<Props>();

const slots = useSlots();
const valueRef = inject(tabsInjectionKey, null);

if (!valueRef) {
    throw new Error('[McTab]: McTab must be placed inside McTabs.');
}

const Render = () => {
    return createVNode(
        'div',
        {
            class: 'mc-tabs-tab'
        },
        [renderSlot(slots, 'default')]
    );
};
</script>

<template>
    <Render />
</template>
