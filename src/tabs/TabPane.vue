<script lang="ts">
export default {
    name: 'TabPane',
    iKey: tabPaneIKey
};
</script>

<script lang="ts" setup>
import { toRefs, inject, computed, createVNode, useSlots, renderSlot, createCommentVNode } from 'vue';
import { tabsInjectionKey, tabPaneIKey } from './interface';

interface Props {
    name?: string | number;
    tabLabel?: string;
}
const props = defineProps<Props>();

const slots = useSlots();
const { name } = toRefs(props);
const valueRef = inject(tabsInjectionKey, null);

if (!valueRef) {
    throw new Error('[McTabPane]: McTabPane must be placed inside McTabs.');
}
const isActive = computed(() => {
    return name?.value === valueRef?.value;
});
const Render = () => {
    return isActive.value
        ? createVNode(
              'div',
              {
                  class: 'mc-tab-pane'
              },
              [renderSlot(slots, 'default')]
          )
        : createCommentVNode('v-if', true);
};
</script>

<template>
    <Render />
</template>
