import { defineComponent, toRefs, renderSlot, mergeProps, createVNode } from 'vue';
import { propsMergeSlots } from '../_utils_';
import { McPopover, popoverProps } from '../popover';
import { TooltipMergedProps, tooltipProps } from './interface';

export default defineComponent({
    name: 'Tooltip',
    props: {
        ...popoverProps,
        ...tooltipProps
    },
    setup(props, { slots }) {
        const { effect } = toRefs(props);

        return () => {
            const mergedProps = mergeProps(props, {
                class: ['mc-tooltip', `mc-tooltip--${effect.value}`]
            });

            return createVNode(McPopover, mergedProps, {
                default: () => renderSlot(slots, 'default'),
                content: () => propsMergeSlots<TooltipMergedProps, 'content'>(props, slots, 'content')
            });
        };
    }
});
