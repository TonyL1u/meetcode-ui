import { ref, computed, toRefs, useSlots, createVNode, inject, FunctionalComponent, defineComponent } from 'vue';
import { useElementBounding } from '@vueuse/core';
import { flatten, SpecificVNode } from '../_utils_';
import { splitInjectionKey } from './interface';

export default defineComponent({
    name: 'Splitter',
    setup() {
        const { parentWidth, BusResize } = inject(splitInjectionKey, null) ?? {};
        const splitterElRef = ref<HTMLElement>();
        const prevSplitPaneDataKey = computed(() => {
            return (splitterElRef.value?.previousElementSibling as HTMLElement).dataset.key;
        });
        const nextSplitPaneDataKey = computed(() => {
            return (splitterElRef.value?.nextElementSibling as HTMLElement).dataset.key;
        });

        const handleMousedown = (e: MouseEvent) => {
            const { clientX: startX, clientY: startY } = e;
            const { value: prevPaneKey } = prevSplitPaneDataKey;
            const { value: nextPaneKey } = nextSplitPaneDataKey;

            // console.log(prevRect);
            // console.log(prevSplitPane.value.style.width);
            // console.log(getComputedStyle(prevSplitPane.value).width);
            // getComputedStyle(prevSplitPane.value);

            const move = (moveEvent: MouseEvent) => {
                const { clientX: curX, clientY: curY } = moveEvent;
                BusResize?.emit({
                    dragSize: curX - startX,
                    prevPaneKey,
                    nextPaneKey
                });
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

        return () => createVNode('div', { ref: splitterElRef, class: 'mc-splitter', onMousedown: handleMousedown }, [splitterMarkerVNode.value]);
    }
});
