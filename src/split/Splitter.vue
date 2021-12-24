<script lang="ts">
export default {
    name: 'Splitter'
};
</script>

<script lang="ts" setup>
import { ref, computed, toRefs, useSlots, createVNode, inject } from 'vue';
import { useElementBounding } from '@vueuse/core';
import { flatten, SpecificVNode } from '../_utils_';
import { splitInjectionKey } from './interface';

interface Props {
    horizontal?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    horizontal: false
});

const slots = useSlots();
const { horizontal } = toRefs(props);
const { parentWidth, BusResize } = inject(splitInjectionKey, null) ?? {};
const splitterElRef = ref<HTMLElement>();
const prevSplitPane = computed(() => {
    return splitterElRef.value?.previousElementSibling as HTMLElement;
});
const nextSplitPane = computed(() => {
    return splitterElRef.value?.nextElementSibling as HTMLElement;
});

const handleMousedown = (e: MouseEvent) => {
    console.log(parentWidth?.value);
    const { clientX: startX, clientY: startY } = e;
    const prevRect = prevSplitPane.value?.getBoundingClientRect();
    const initWidth = getComputedStyle(prevSplitPane.value).width.slice(0, -2);
    console.log(prevRect);
    console.log(prevSplitPane.value.style.width);
    console.log(getComputedStyle(prevSplitPane.value).width);
    getComputedStyle(prevSplitPane.value);

    const move = (moveEvent: MouseEvent) => {
        const { clientX: curX, clientY: curY } = moveEvent;
        BusResize?.emit(curX - startX);
        // prevSplitPane.value.style.width = `${initWidth + (curX - startX)}px`;
    };

    const up = (upEvent: MouseEvent) => {
        splitterElRef.value?.removeEventListener('mousemove', move);
        splitterElRef.value?.removeEventListener('mouseup', up);
    };

    splitterElRef.value?.addEventListener('mousemove', move);
    splitterElRef.value?.addEventListener('mouseup', up);
};

const splitterMarkerVNode = computed(() => {
    return createVNode('div', { class: 'mc-splitter__marker' });
});

const Render = () => {
    return createVNode('div', { ref: splitterElRef, class: 'mc-splitter', onMousedown: handleMousedown }, [splitterMarkerVNode.value]);
};
</script>

<template>
    <Render />
</template>
