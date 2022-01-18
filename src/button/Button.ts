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
        color: '#3b82f6',
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6'
    },
    success: {
        color: '#16a34a',
        borderColor: '#16a34a',
        backgroundColor: '#16a34a'
    },
    warning: {
        color: '#fb923c',
        borderColor: '#fb923c',
        backgroundColor: '#fb923c'
    },
    danger: {
        color: '#dc2626',
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

        const isDefault = computed(() => type.value === 'default');
        const isNotNormal = computed(() => render.value !== 'normal');
        const isTransparent = or(ghost, dashed, isNotNormal.value);

        const useDefaultColor = and(type.value === 'custom', !color.value, !textColor.value);
        const useDefaultBorderColor = and(type.value === 'custom', !color.value, !borderColor.value);
        const useDefaultBackgroundColor = and(type.value === 'custom', !color.value);
        const cssVars = computed<CSS.Properties>(() => {
            const {
                default: defaultColorSet,
                hover: hoverColorSet,
                active: activeColorSet,
                disabled: disabledColorSet
            } = useColorFactory<ButtonColorSet>({
                color: type.value === 'custom' ? textColor.value || color.value || BASE_COLOR_MAP.default.color : BASE_COLOR_MAP[type.value!].color,
                borderColor: type.value === 'custom' ? borderColor.value || color.value || BASE_COLOR_MAP.default.borderColor : BASE_COLOR_MAP[type.value!].borderColor,
                backgroundColor: type.value === 'custom' ? color.value || BASE_COLOR_MAP.default.backgroundColor : BASE_COLOR_MAP[type.value!].backgroundColor
            });
            const buttonSizeSet: ButtonSizeSet = SIZE_MAP[size.value!];

            return {
                '--button-default-color': or(isDefault, useDefaultColor).value ? '#000' : or(isTransparent, useDefaultColor).value ? defaultColorSet.color : '#fff',
                '--button-default-border-color': isNotNormal.value ? 'transparent' : type.value === 'default' ? '#e0e0e6' : defaultColorSet.borderColor,
                '--button-default-background-color': isTransparent.value ? 'transparent' : type.value === 'default' ? '#fff' : defaultColorSet.backgroundColor,

                '--button-hover-color': or(isDefault, useDefaultColor).value ? '#059669' : or(isTransparent, useDefaultColor).value ? hoverColorSet.color : '#fff',
                '--button-hover-border-color': isNotNormal.value ? 'transparent' : type.value === 'default' ? '#10b981' : hoverColorSet.borderColor,
                '--button-hover-background-color': isTransparent.value ? 'transparent' : type.value === 'default' ? '#fff' : hoverColorSet.backgroundColor,

                '--button-active-color': or(isDefault, useDefaultColor).value ? '#15803d' : or(isTransparent, useDefaultColor).value ? activeColorSet.color : '#fff',
                '--button-active-border-color': isNotNormal.value ? 'transparent' : type.value === 'default' ? '#15803d' : activeColorSet.borderColor,
                '--button-active-background-color': isTransparent.value ? 'transparent' : type.value === 'default' ? '#fff' : activeColorSet.backgroundColor,

                '--button-disabled-color': or(isDefault, useDefaultColor).value ? '#aaa' : or(isTransparent, useDefaultColor).value ? disabledColorSet.color : '#fff',
                '--button-disabled-border-color': isNotNormal.value ? 'transparent' : type.value === 'default' ? '#eee' : disabledColorSet.borderColor,
                '--button-disabled-background-color': isTransparent.value ? 'transparent' : type.value === 'default' ? '#fff' : disabledColorSet.backgroundColor,

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
