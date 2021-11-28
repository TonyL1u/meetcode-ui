<script lang="ts">
export default {
    name: 'TabPane',
    iKey: tabPaneIKey
};
</script>

<script lang="ts" setup>
import { ref, toRefs, inject, computed, createVNode, createCommentVNode, useSlots, renderSlot, vShow, withDirectives } from 'vue';
import { watchOnce } from '@vueuse/core';
import { tabsInjectionKey, tabPaneIKey } from './interface';

interface Props {
    name?: string | number;
    tabLabel?: string;
    disabled?: boolean;
    preload?: boolean;
    lazy?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    preload: false,
    lazy: false
});

const slots = useSlots();
const { name, preload, lazy } = toRefs(props);
const valueRef = inject(tabsInjectionKey, null);

if (!valueRef) {
    throw new Error('[McTabPane]: McTabPane must be placed inside McTabs.');
}
const isActive = computed(() => {
    return name?.value === valueRef?.value;
});
const hasShown = ref(isActive.value);

if (lazy.value && !hasShown.value) {
    watchOnce(isActive, () => {
        hasShown.value = true;
    });
}

const Render = () => {
    const tabPaneVNode = createVNode('div', { class: 'mc-tab-pane' }, [renderSlot(slots, 'default')]);
    if (preload.value) {
        return withDirectives(tabPaneVNode, [[vShow, isActive.value]]);
    } else {
        if (lazy.value) {
            return hasShown.value ? withDirectives(tabPaneVNode, [[vShow, isActive.value]]) : createCommentVNode('v-if', true);
        } else {
            return isActive.value ? tabPaneVNode : createCommentVNode('v-if', true);
        }
    }
};
</script>

<template>
    <Render />
</template>
