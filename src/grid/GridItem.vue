<script lang="ts">
import { GridItemIKey } from './interface';

export default {
    name: 'GridItem',
    alias: [GridItemIKey]
};
</script>

<script lang="ts" setup>
import { toRefs, computed, useSlots, renderSlot, createVNode } from 'vue';
import * as CSS from 'csstype';

interface Props {
    x?: number;
    y?: number;
    xSize?: number;
    ySize?: number;
    justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    align?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
}
const props = withDefaults(defineProps<Props>(), {
    xSize: 1,
    ySize: 1
});

const slots = useSlots();
const { x, y, xSize, ySize, justify, align } = toRefs(props);

const cssVars = computed<CSS.Properties>(() => {
    return {
        '--column-start': x?.value || '',
        '--row-start': y?.value || '',
        '--column-end': x?.value ? x.value + xSize.value : '',
        '--row-end': y?.value ? y.value + ySize.value : '',
        '--justify-content': justify?.value || '',
        '--align-items': align?.value || ''
    };
});

const Render = () => {
    return createVNode(
        'div',
        {
            class: 'mc-grid-item',
            style: cssVars.value
        },
        [renderSlot(slots, 'default')]
    );
};
</script>

<template>
    <Render />
</template>
