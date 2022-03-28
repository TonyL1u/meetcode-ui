import { defineComponent, toRefs, computed, createVNode } from 'vue';
import { flattenWithOptions } from '../_utils_';
import { spaceProps } from './interface';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'Space',
    props: spaceProps,
    setup(props, { slots }) {
        const { vertical, gap, itemStyle, justify } = toRefs(props);
        const cssVars = computed<CSS.Properties>(() => {
            return {
                '--space-direction': vertical.value ? 'column' : 'row',
                '--space-justify': justify.value,
                '--space-item-gap': vertical.value ? `0 0 ${gap.value}px 0` : `0 ${gap.value}px 0 0`
            };
        });

        return () => {
            const spaceItems = flattenWithOptions({ slots });

            return createVNode(
                'div',
                { class: ['mc-space', { 'mc-space--vertical': vertical.value }], style: cssVars.value },
                spaceItems.map(item => {
                    return createVNode('div', { class: 'mc-space-item', style: itemStyle.value }, [item]);
                })
            );
        };
    }
});
