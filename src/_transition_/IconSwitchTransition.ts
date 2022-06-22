import { createVNode, Transition, defineComponent, onMounted, renderSlot } from 'vue';
import { useThemeRegister } from '../_utils_';
import iconSwitchCssr from '../_styles_/icon-switch-transition.cssr';

export default defineComponent({
    name: 'BaseIconSwitchTransition',
    setup(_, { slots }) {
        onMounted(() => {
            useThemeRegister({
                key: 'McIconSwitchTransition',
                main: iconSwitchCssr
            });
        });

        return () =>
            createVNode(
                Transition,
                { name: 'icon-switch-transition' },
                {
                    default: () => renderSlot(slots, 'default')
                }
            );
    }
});
