<script lang="ts">
export default {
    name: 'Tab',
    iKey: tabIKey
};
</script>

<script lang="ts" setup>
import { toRefs, inject, createVNode, useSlots, renderSlot } from 'vue';
import { tabsInjectionKey, tabIKey } from './interface';

interface Props {
    isActive: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    isActive: false
});

const slots = useSlots();
const { isActive } = toRefs(props);
const valueRef = inject(tabsInjectionKey, null);

if (!valueRef) {
    throw new Error('[McTab]: McTab must be placed inside McTabs.');
}

const Render = () => {
    return createVNode(
        'div',
        {
            class: ['mc-tabs-tab', { 'mc-tabs-tab--active': isActive.value }]
        },
        [renderSlot(slots, 'default')]
    );
};
</script>

<template>
    <Render />
</template>
