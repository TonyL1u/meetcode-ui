import { Transition, defineComponent, onMounted, renderSlot } from 'vue';
import { useThemeRegister, createComponentVNode } from '../_utils_';
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
            createComponentVNode(
                Transition,
                { name: 'icon-switch-transition' },
                {
                    default: () => renderSlot(slots, 'default')
                }
            );
    }
});
