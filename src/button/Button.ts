import { defineComponent, createVNode, renderSlot, ref, computed, toRefs } from 'vue';
import { ButtonColorSet, ButtonColorMap, ButtonSizeSet, ButtonSizeMap, buttonProps } from './interface';
import { or, and } from '@vueuse/core';
import { McIcon } from '../icon';
import { createHoverColor, createActiveColor } from '../_utils_';
import * as CSS from 'csstype';

const COLOR_MAP: ButtonColorMap = {
    default: {
        default: { color: '#000', borderColor: '#e0e0e6', backgroundColor: '#fff' },
        hover: { color: '#059669', borderColor: '#10b981', backgroundColor: '#fff' },
        active: { color: '#15803d', borderColor: '#15803d', backgroundColor: '#fff' },
        disabled: { color: '#aaa', borderColor: '#eee', backgroundColor: '#fff' }
    },
    primary: {
        default: { color: '#fff', borderColor: '#3b82f6', backgroundColor: '#3b82f6' },
        hover: { color: '#fff', borderColor: '#4098fc', backgroundColor: '#4098fc' },
        active: { color: '#fff', borderColor: '#2563e3', backgroundColor: '#2563e3' },
        disabled: { color: '#fff', borderColor: '#7dd3fc', backgroundColor: '#7dd3fc' }
    },
    success: {
        default: { color: '#fff', borderColor: '#16a34a', backgroundColor: '#16a34a' },
        hover: { color: '#fff', borderColor: '#36ad6a', backgroundColor: '#36ad6a' },
        active: { color: '#fff', borderColor: '#15803d', backgroundColor: '#15803d' },
        disabled: { color: '#fff', borderColor: '#6ee7b7', backgroundColor: '#6ee7b7' }
    },
    warning: {
        default: { color: '#fff', borderColor: '#fb923c', backgroundColor: '#fb923c' },
        hover: { color: '#fff', borderColor: '#eab308', backgroundColor: '#eab308' },
        active: { color: '#fff', borderColor: '#f97316', backgroundColor: '#f97316' },
        disabled: { color: '#fff', borderColor: '#fdba74', backgroundColor: '#fdba74' }
    },
    danger: {
        default: { color: '#fff', borderColor: '#dc2626', backgroundColor: '#dc2626' },
        hover: { color: '#fff', borderColor: '#ea580c', backgroundColor: '#ea580c' },
        active: { color: '#fff', borderColor: '#c2410c', backgroundColor: '#c2410c' },
        disabled: { color: '#fff', borderColor: '#fca5a5', backgroundColor: '#fca5a5' }
    }
};
const SIZE_MAP: ButtonSizeMap = {
    mini: {
        height: '20px',
        padding: '0 4px',
        fontSize: '12px',
        iconSize: '14px',
        iconMargin: '2px'
    },
    small: {
        height: '26px',
        padding: '0 8px',
        fontSize: '13px',
        iconSize: '16px',
        iconMargin: '3px'
    },
    medium: {
        height: '32px',
        padding: '0 12px',
        fontSize: '14px',
        iconSize: '18px',
        iconMargin: '4px'
    },
    large: {
        height: '38px',
        padding: '0 16px',
        fontSize: '16px',
        iconSize: '20px',
        iconMargin: '5px'
    }
};
export default defineComponent({
    name: 'Button',
    props: buttonProps,
    setup(props, { slots }) {
        const { type, size, disabled, ghost, dashed, render, round, circle, block, color } = toRefs(props);
        console.log(createHoverColor('#16a34a'));
        const cssVars = computed<CSS.Properties>(() => {
            const defaultColorSet: ButtonColorSet = COLOR_MAP[type.value!].default;
            const hoverColorSet: ButtonColorSet = COLOR_MAP[type.value!].hover;
            const activeColorSet: ButtonColorSet = COLOR_MAP[type.value!].active;
            const disabledColorSet: ButtonColorSet = COLOR_MAP[type.value!].disabled;
            const buttonSizeSet: ButtonSizeSet = SIZE_MAP[size.value!];

            return {
                '--button-default-color': and(or(ghost, dashed, render.value !== 'normal'), type.value !== 'default').value ? defaultColorSet.borderColor : defaultColorSet.color,
                '--button-default-border-color': render.value !== 'normal' ? 'transparent' : defaultColorSet.borderColor,
                '--button-default-background-color': or(ghost, dashed, render.value !== 'normal').value ? 'transparent' : defaultColorSet.backgroundColor,
                '--button-hover-color': or(ghost, dashed, render.value !== 'normal').value ? hoverColorSet.borderColor : hoverColorSet.color,
                '--button-hover-border-color': render.value !== 'normal' ? 'transparent' : hoverColorSet.borderColor,
                '--button-hover-background-color': or(ghost, dashed, render.value !== 'normal').value ? 'transparent' : hoverColorSet.backgroundColor,
                '--button-active-color': or(ghost, dashed, render.value !== 'normal').value ? activeColorSet.borderColor : activeColorSet.color,
                '--button-active-border-color': render.value !== 'normal' ? 'transparent' : activeColorSet.borderColor,
                '--button-active-background-color': or(ghost, dashed, render.value !== 'normal').value ? 'transparent' : activeColorSet.backgroundColor,
                '--button-disabled-color': or(ghost, dashed, render.value !== 'normal').value ? disabledColorSet.borderColor : disabledColorSet.color,
                '--button-disabled-border-color': render.value !== 'normal' ? 'transparent' : disabledColorSet.borderColor,
                '--button-disabled-background-color': or(ghost, dashed, render.value !== 'normal').value ? 'transparent' : disabledColorSet.backgroundColor,
                '--button-width': circle.value ? buttonSizeSet.height : 'initial',
                '--button-height': buttonSizeSet.height,
                '--button-padding': buttonSizeSet.padding,
                '--button-font-size': buttonSizeSet.fontSize,
                '--button-icon-size': buttonSizeSet.iconSize,
                '--button-icon-margin': buttonSizeSet.iconMargin,
                '--button-radius': circle.value ? '50%' : round.value ? buttonSizeSet.height : '3px'
            };
        });

        const iconVNode = computed(() => {
            return slots.icon ? createVNode('span', { class: 'mc-button__icon' }, [renderSlot(slots, 'icon')]) : null;
        });

        const contentVNode = computed(() => {
            return slots.default ? createVNode('span', { class: 'mc-button__content' }, [renderSlot(slots, 'default')]) : null;
        });

        return () =>
            createVNode(
                'button',
                {
                    class: [
                        'mc-button',
                        `mc-button--${render.value}`,
                        `mc-button--${type.value}`,
                        `mc-button--${size.value}`,
                        { 'mc-button--block': block.value, 'mc-button--disabled': disabled.value, 'mc-button--ghost': ghost.value, 'mc-button--dashed': dashed.value, 'mc-button--round': round.value, 'mc-button--circle': circle.value }
                    ],
                    disabled: disabled.value,
                    style: cssVars.value
                },
                [iconVNode.value, contentVNode.value]
            );
    }
});
