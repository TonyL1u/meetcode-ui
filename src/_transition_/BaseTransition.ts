import { Transition, defineComponent, onMounted, renderSlot, toRefs } from 'vue';
import { useThemeRegister, createComponentVNode, c } from '../_utils_';
import type { PropType, CSSProperties } from 'vue';

export default defineComponent({
    name: 'BaseTransition',
    props: {
        appear: Boolean,
        name: String,
        enterFrom: Object as PropType<CSSProperties>,
        leaveTo: Object as PropType<CSSProperties>
    },
    setup(props, { slots }) {
        const { appear, name, enterFrom, leaveTo } = toRefs(props);

        onMounted(() => {
            useThemeRegister({
                key: `McBaseTransition-${name.value}`,
                main: c([c(`.${name.value}-enter-from`, { ...(enterFrom.value ?? {}) }), c(`.${name.value}-leave-to`, { ...(leaveTo.value ?? enterFrom.value ?? {}) })])
            });
        });

        return () =>
            createComponentVNode(
                Transition,
                { name: name.value, appear: appear.value },
                {
                    default: () => renderSlot(slots, 'default')
                }
            );
    }
});
