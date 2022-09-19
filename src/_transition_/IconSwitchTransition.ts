import { Transition, defineComponent, onMounted, renderSlot } from 'vue';
import { createComponentVNode } from '../_utils_';
import { useThemeRegister } from '../_composable_';
import iconSwitchCssr from '../_styles_/icon-switch-transition.cssr';

export default defineComponent({
    name: 'IconSwitchTransition',
    setup(_, { slots }) {
        useThemeRegister({
            key: 'McIconSwitchTransition',
            main: iconSwitchCssr
        });

        return () =>
            createComponentVNode(
                Transition,
                { name: 'icon-switch-transition' },
                {
                    default: () => renderSlot(slots, 'default')
                }
            );
    }
});
