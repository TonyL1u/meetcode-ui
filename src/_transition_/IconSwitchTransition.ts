import { Transition, defineComponent, renderSlot, toRefs } from 'vue';
import { createComponentVNode, createComponentBlockVNode, SlotFlags } from '../_utils_';
import { useThemeRegister } from '../_composable_';
import iconSwitchCssr from '../_styles_/icon-switch-transition.cssr';
import type { PropType } from 'vue';

export default defineComponent({
    name: 'IconSwitchTransition',
    props: {
        mode: {
            type: String as PropType<'in-out' | 'out-in' | 'default'>,
            default: 'default'
        }
    },
    setup(props, { slots }) {
        useThemeRegister({
            key: 'McIconSwitchTransition',
            main: iconSwitchCssr
        });

        const { mode } = toRefs(props);

        return () =>
            createComponentBlockVNode(
                Transition,
                { name: 'icon-switch-transition', mode: mode.value },
                {
                    default: () => renderSlot(slots, 'default'),
                    _: SlotFlags.FORWARDED
                }
            );
    }
});
