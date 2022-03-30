import { defineComponent, renderSlot, createVNode } from 'vue';
import { propsMergeSlots, useThemeRegister } from '../_utils_';
import { McPopover, popoverProps } from '../popover';
import { TooltipMergedProps, tooltipProps } from './interface';
import { lightCssr, darkCssr } from './styles';

export default defineComponent({
    name: 'Tooltip',
    props: {
        ...popoverProps,
        ...tooltipProps
    },
    setup(props, { slots }) {
        // theme register
        useThemeRegister({
            key: 'McTooltip',
            light: lightCssr,
            dark: darkCssr
        });

        return () =>
            createVNode(
                McPopover,
                {
                    class: 'mc-tooltip'
                },
                {
                    default: () => renderSlot(slots, 'default'),
                    content: () => propsMergeSlots<TooltipMergedProps, 'content'>(props, slots, 'content')
                }
            );
    }
});
