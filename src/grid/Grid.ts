import { toRefs, computed, renderSlot, createVNode, defineComponent } from 'vue';
import { GridIKey, gridProps } from './interface';
import type { StyleValue } from 'vue';

export default defineComponent({
    name: 'Grid',
    props: gridProps,
    setup(props, { slots }) {
        const { rows, columns, gap, xGap, yGap, justify, align, autoColumns, autoRows, fillMode } = toRefs(props);

        const columnsTemplate = computed(() => {
            if (autoColumns?.value) {
                if (Array.isArray(autoColumns.value)) {
                    const [min = '0', max = '1fr'] = autoColumns.value;
                    return `repeat(${fillMode.value}, minmax(${min}, ${max}))`;
                } else {
                    return `repeat(${fillMode.value}, ${autoColumns.value})`;
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
                    return `repeat(${fillMode.value}, minmax(${min}, ${max}))`;
                } else {
                    return `repeat(${fillMode.value}, ${autoRows.value})`;
                }
            } else if (rows?.value) {
                return `repeat(${rows.value},1fr)`;
            } else {
                return '';
            }
        });
        const cssVars = computed<StyleValue>(() => {
            return {
                '--grid-rows-template': rowsTemplate.value,
                '--grid-columns-template': columnsTemplate.value,
                '--grid-gap': `${gap?.value || yGap?.value || 0}px ${gap?.value || xGap?.value || 0}px`,
                '--grid-justify': justify?.value || '',
                '--grid-align': align?.value || ''
            };
        });

        return () =>
            createVNode(
                'div',
                {
                    class: 'mc-grid',
                    style: cssVars.value
                },
                [renderSlot(slots, 'default')]
            );
    }
});
