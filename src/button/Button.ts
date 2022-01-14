import { defineComponent, createVNode, renderSlot, ref, computed, toRefs } from 'vue';
import { ButtonColorSet, ButtonColorMap, ButtonType, buttonProps } from './interface';
import * as CSS from 'csstype';

const TYPE_MAP: ButtonColorMap = {
    default: {
        default: { color: '#000', borderColor: '#e0e0e6', backgroundColor: 'transparent' },
        hover: { color: '#059669', borderColor: '#10b981', backgroundColor: 'transparent' }
    },
    primary: {
        default: { color: '#fff', borderColor: '#3b82f6', backgroundColor: '#3b82f6' },
        hover: { color: '#fff', borderColor: '#4098fc', backgroundColor: '#4098fc' }
    },
    success: {
        default: { color: '#fff', borderColor: '#16a34a', backgroundColor: '#16a34a' },
        hover: { color: '#fff', borderColor: '#36ad6a', backgroundColor: '#36ad6a' }
    },
    warning: {
        default: { color: '#fff', borderColor: '#fb923c', backgroundColor: '#fb923c' },
        hover: { color: '#fff', borderColor: '#eab308', backgroundColor: '#eab308' }
    },
    danger: {
        default: { color: '#fff', borderColor: '#dc2626', backgroundColor: '#dc2626' },
        hover: { color: '#fff', borderColor: '#ea580c', backgroundColor: '#ea580c' }
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
