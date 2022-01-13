import { defineComponent, createVNode, renderSlot, ref, computed, toRefs } from 'vue';
import { ButtonColorSet, ButtonColorMap, ButtonType, buttonProps } from './interface';
import * as CSS from 'csstype';

const TYPE_MAP: ButtonColorMap = {
    default: {
        default: { color: '#000', borderColor: '#e0e0e6', backgroundColor: 'transparent' },
        hover: { color: '#059669', borderColor: '#10b981', backgroundColor: 'transparent' }
    },
    success: {
        default: { color: '#fff', borderColor: '#16A34A', backgroundColor: '#16A34A' },
        hover: { color: '#fff', borderColor: '#10B981', backgroundColor: '#10B981' }
    },
    danger: {
        default: { color: '#fff', borderColor: '#DC2626', backgroundColor: '#DC2626' },
        hover: { color: '#fff', borderColor: '#EF4444', backgroundColor: '#EF4444' }
    }
};
export default defineComponent({
    name: 'Button',
    props: buttonProps,
    setup(props, { slots }) {
        const { type } = toRefs(props);
        const isWaving = ref(false);
        const cssVars = computed<CSS.Properties>(() => {
            const defaultColorSet: ButtonColorSet = TYPE_MAP[type.value!].default;
            const hoverColorSet: ButtonColorSet = TYPE_MAP[type.value!].hover;
            return {
                '--button-default-color': defaultColorSet.color,
                '--button-default-border-color': defaultColorSet.borderColor,
                '--button-default-background-color': defaultColorSet.backgroundColor,
                '--button-hover-color': hoverColorSet.color,
                '--button-hover-border-color': hoverColorSet.borderColor,
                '--button-hover-background-color': hoverColorSet.backgroundColor
            };
        });

        return () =>
            createVNode(
                'button',
                {
                    class: ['mc-button', { 'mc-button--waving': isWaving.value }],
                    style: cssVars.value
                    // onClick: (evt: MouseEvent) => {
                    //     if (isWaving.value) {
                    //         isWaving.value = false;
                    //     }
                    //     isWaving.value = true;
                    // },
                    // onAnimationend: () => {
                    //     setTimeout(() => {
                    //         isWaving.value = false;
                    //     }, 400);
                    // }
                },
                [createVNode('span', { class: 'mc-button__inner' }, [renderSlot(slots, 'default')])]
            );
    }
});
