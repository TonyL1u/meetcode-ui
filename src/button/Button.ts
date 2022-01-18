import { defineComponent, createVNode, renderSlot, ref, computed, toRefs } from 'vue';
import { ButtonColorSet, ButtonSizeSet, ButtonSizeMap, ButtonType, buttonProps } from './interface';
import { or, and } from '@vueuse/core';
import { McIcon } from '../icon';
import { UnionOmit, useColorFactory } from '../_utils_';
import * as CSS from 'csstype';

const BASE_COLOR_MAP: Record<UnionOmit<ButtonType, 'custom'>, ButtonColorSet> = {
    default: {
        color: '#000',
        borderColor: '#e0e0e6',
        backgroundColor: '#fff'
    },
    primary: {
        color: '#fff',
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6'
    },
    success: {
        color: '#fff',
        borderColor: '#16a34a',
        backgroundColor: '#16a34a'
    },
    warning: {
        color: '#fff',
        borderColor: '#fb923c',
        backgroundColor: '#fb923c'
    },
    danger: {
        color: '#fff',
        borderColor: '#dc2626',
        backgroundColor: '#dc2626'
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
        const { type, size, disabled, ghost, dashed, render, round, circle, block, color, textColor, borderColor } = toRefs(props);
        const isTransparent = or(ghost, dashed, render.value !== 'normal');
        const cssVars = computed<CSS.Properties>(() => {
            const {
                default: defaultColorSet,
                hover: hoverColorSet,
                active: activeColorSet,
                disabled: disabledColorSet
            } = useColorFactory<ButtonColorSet>({
                color: type.value === 'custom' ? textColor.value || BASE_COLOR_MAP.default.color : BASE_COLOR_MAP[type.value!].color,
                borderColor: type.value === 'custom' ? borderColor.value || color.value || BASE_COLOR_MAP.default.borderColor : BASE_COLOR_MAP[type.value!].borderColor,
                backgroundColor: type.value === 'custom' ? color.value || BASE_COLOR_MAP.default.backgroundColor : BASE_COLOR_MAP[type.value!].backgroundColor

                // colorSet:
                //     type.value === 'default' || (type.value === 'custom' && !textColor.value)
                //         ? type.value === 'custom'
                //             ? { default: '#fff', hover: '#fff', active: '#fff', disabled: '#fff' }
                //             : { default: '#000', hover: '#059669', active: '#15803d', disabled: '#aaa' }
                //         : {},
                // borderColorSet: type.value === 'default' || (type.value === 'custom' && !borderColor.value && !color.value) ? { default: '#e0e0e6', hover: '#10b981', active: '#15803d', disabled: '#eee' } : {},
                // backgroundColorSet: type.value === 'default' || (type.value === 'custom' && !color.value) ? { default: '#fff', hover: '#fff', active: '#fff', disabled: '#fff' } : {}
            });
            const buttonSizeSet: ButtonSizeSet = SIZE_MAP[size.value!];

            return {
                // '--button-default-color': and(isTransparent, type.value !== 'default', type.value !== 'custom').value ? defaultColorSet.borderColor : defaultColorSet.color,
                '--button-default-color': isTransparent.value ? defaultColorSet.color : type.value === 'default' ? '#000' : '#fff',
                '--button-default-border-color': render.value !== 'normal' ? 'transparent' : defaultColorSet.borderColor,
                '--button-default-background-color': isTransparent.value ? 'transparent' : defaultColorSet.backgroundColor,
                // '--button-hover-color': and(isTransparent, type.value !== 'custom').value ? hoverColorSet.borderColor : hoverColorSet.color,
                '--button-hover-color': isTransparent.value ? hoverColorSet.color : type.value === 'default' ? '#059669' : '#fff',
                '--button-hover-border-color': render.value !== 'normal' ? 'transparent' : hoverColorSet.borderColor,
                '--button-hover-background-color': isTransparent.value ? 'transparent' : hoverColorSet.backgroundColor,
                // '--button-active-color': and(isTransparent, type.value !== 'custom').value ? activeColorSet.borderColor : activeColorSet.color,
                '--button-active-color': isTransparent.value ? activeColorSet.color : type.value === 'default' ? '#15803d' : '#fff',
                '--button-active-border-color': render.value !== 'normal' ? 'transparent' : activeColorSet.borderColor,
                '--button-active-background-color': isTransparent.value ? 'transparent' : activeColorSet.backgroundColor,
                // '--button-disabled-color': isTransparent.value ? disabledColorSet.borderColor : disabledColorSet.color,
                '--button-disabled-color': type.value == 'default' ? '#aaa' : disabledColorSet.color,
                '--button-disabled-border-color': render.value !== 'normal' ? 'transparent' : disabledColorSet.borderColor,
                '--button-disabled-background-color': isTransparent.value ? 'transparent' : disabledColorSet.backgroundColor,
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
