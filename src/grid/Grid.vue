<script lang="ts">
import { GridIKey } from './interface';

export default {
    name: 'Grid',
    iKey: GridIKey
};
</script>

<script lang="ts" setup>
import { toRefs, computed, useSlots, renderSlot, createVNode } from 'vue';
import * as CSS from 'csstype';

interface Props {
    rows?: number;
    columns?: number;
    gap?: number;
    xGap?: number;
    yGap?: number;
    autoColumns?: string | Array<string>;
    autoRows?: string | Array<string>;
    autofill?: boolean;
    itemJustify?: 'start' | 'end' | 'center' | 'stretch';
    itemAlign?: 'start' | 'end' | 'center' | 'stretch';
}

const props = withDefaults(defineProps<Props>(), {
    rows: 1,
    columns: 1,
    gap: 0,
    xGap: 0,
    yGap: 0,
    autofill: false
});

const slots = useSlots();
const { rows, columns, gap, xGap, yGap, itemJustify, itemAlign, autoColumns, autoRows, autofill } = toRefs(props);

const fitMode = computed(() => {
    if (autoColumns?.value || autoRows?.value) {
        return autofill?.value ? 'auto-fill' : 'auto-fit';
    } else {
        return '';
    }
});
const columnsTemplate = computed(() => {
    if (autoColumns?.value) {
        if (Array.isArray(autoColumns.value)) {
            const [min = '0', max = '1fr'] = autoColumns.value;
            return `repeat(${fitMode.value}, minmax(${min}, ${max}))`;
        } else {
            return `repeat(${fitMode.value}, ${autoColumns.value})`;
        }
    } else if (columns?.value) {
        return `repeat(${columns.value}, 1fr)`;
    } else {
        return '';
    }
});
const rowsTemplate = computed(() => {
    if (autoRows?.value) {
        if (Array.isArray(autoRows.value)) {
            const [min = '0', max = '1fr'] = autoRows.value;
            return `repeat(${fitMode.value}, minmax(${min}, ${max}))`;
        } else {
            return `repeat(${fitMode.value}, ${autoRows.value})`;
        }
    } else if (rows?.value) {
        return `repeat(${rows.value},1fr)`;
    } else {
        return '';
    }
});

const cssVars = computed<CSS.Properties>(() => {
    return {
        '--rows-template': rowsTemplate.value,
        '--columns-template': columnsTemplate.value,
        '--grid-gap': `${gap?.value || yGap?.value || 0}px ${gap?.value || xGap?.value || 0}px`,
        '--item-justify': itemJustify?.value || '',
        '--item-align': itemAlign?.value || ''
    };
});

const Render = () => {
    return createVNode(
        'div',
        {
            class: 'mc-grid',
            style: cssVars.value
        },
        [renderSlot(slots, 'default')]
    );
};
</script>

<template>
    <Render />
</template>
