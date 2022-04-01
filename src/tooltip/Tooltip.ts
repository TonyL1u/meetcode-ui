import { defineComponent, renderSlot, createVNode, mergeProps, onMounted } from 'vue';
import { propsMergeSlots, useThemeRegister } from '../_utils_';
import { omit } from 'lodash-es';
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
        onMounted(() => {
            useThemeRegister({
                key: 'McTooltip',
                light: lightCssr,
                dark: darkCssr
            });
        });

        return () => {
            const mergedProps = mergeProps(omit(props, Object.keys(tooltipProps)), {
                class: 'mc-tooltip'
            });

            return createVNode(McPopover, mergedProps, {
                default: () => renderSlot(slots, 'default'),
                content: () => propsMergeSlots<TooltipMergedProps, 'content'>(props, slots, 'content')
            });
        };
    }
});
