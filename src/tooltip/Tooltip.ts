import { defineComponent, renderSlot, mergeProps, onMounted } from 'vue';
import { propsMergeSlots, useThemeRegister, createComponentVNode, PatchFlags, SlotFlags } from '../_utils_';
import { omit } from 'lodash-es';
import { McPopover } from '../popover';
import { popoverProps } from '../popover/interface';
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
                key: 'Tooltip',
                light: lightCssr,
                dark: darkCssr
            });
        });

        return () => {
            const mergedProps = mergeProps(omit(props, Object.keys(tooltipProps)), {
                class: 'mc-tooltip'
            });

            return createComponentVNode<TooltipMergedProps, 'default' | 'content'>(
                McPopover,
                mergedProps,
                {
                    default: () => renderSlot(slots, 'default'),
                    content: () => propsMergeSlots<TooltipMergedProps, 'content'>(props, slots, 'content'),
                    _: SlotFlags.FORWARDED
                },
                PatchFlags.FULL_PROPS
            );
        };
    }
});
