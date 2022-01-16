import { defineComponent, toRefs, mergeProps, createVNode } from 'vue';
import { getSlotFirstVNode } from '../_utils_';
import { iconProps } from './interface';

export default defineComponent({
    name: 'Icon',
    props: iconProps,
    setup(props, { slots, attrs }) {
        const { size, color, spin } = toRefs(props);

        return () => {
            const mergedProps = mergeProps(attrs, {
                role: 'img',
                class: ['mc-icon', { 'mc-icon--spinning': spin.value }],
                style: {
                    fontSize: size.value ? `${size.value}px` : 'inherit',
                    color: color.value
                }
            });

            return createVNode('i', mergedProps, [getSlotFirstVNode(slots.default)]);
        };
    }
});
