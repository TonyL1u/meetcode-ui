import { ref, watch } from 'vue';
import { useElementBounding, useWindowSize } from '@vueuse/core';
import type { MaybeElementRef } from '@vueuse/core';

export function useElementVisibility(target: MaybeElementRef) {
    const visible = ref(false);
    const { top, height: elHeight, left, width: elWidth } = useElementBounding(target);
    const { width, height } = useWindowSize();

    watch([top, elHeight, left, elWidth, width, height], () => {
        if (top.value >= -elHeight.value && top.value <= height.value && left.value >= -elWidth.value && left.value <= width.value) {
            visible.value = true;
        } else {
            visible.value = false;
        }
    });

    return visible;
}
