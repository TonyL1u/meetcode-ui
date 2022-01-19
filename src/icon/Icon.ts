import { defineComponent, toRefs, mergeProps, createVNode, computed } from 'vue';
import { getSlotFirstVNode } from '../_utils_';
import { iconProps } from './interface';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'Icon',
    props: iconProps,
    setup(props, { slots, attrs }) {
        const { size, color, spin } = toRefs(props);

        const cssVars = computed<CSS.Properties>(() => {
            return {
                '--icon-color': color.value ?? 'initial',
                '--icon-font-size': size.value ? `${size.value}px` : 'initial'
            };
        });
        return () => {
            const mergedProps = mergeProps(attrs, {
                role: 'img',
                class: ['mc-icon', { 'mc-icon--spinning': spin.value }],
                style: cssVars.value
            });

            return createVNode('i', mergedProps, [getSlotFirstVNode(slots.default)]);
        };
    }
});
