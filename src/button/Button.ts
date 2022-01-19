import { defineComponent, createVNode, renderSlot, ref, computed, toRefs } from 'vue';
import { ButtonColorSet, ButtonSizeSet, ButtonSizeMap, ButtonType, buttonProps } from './interface';
import { or, and, not } from '@vueuse/core';
import { McIcon } from '../icon';
import { useColorFactory } from '../_utils_';
import * as CSS from 'csstype';

const BASE_COLOR_MAP: Record<ButtonType, ButtonColorSet> = {
    custom: {
        color: '#000',
        borderColor: '#e0e0e6',
        backgroundColor: '#fff'
    },
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
        const { type, size, disabled, ghost, dashed, render, round, circle, block, color, textColor, borderColor, colorSet, textColorSet, borderColorSet } = toRefs(props);

        const isDefault = computed(() => type.value === 'default');
        const isCustom = computed(() => type.value === 'custom');
        const isNotNormal = computed(() => render.value !== 'normal');
        const isTransparent = or(ghost, dashed, isNotNormal.value);

        const customWithoutColor = and(isCustom, not(color));
        const useDefaultColor = and(customWithoutColor, not(textColor));
        const useDefaultBorderColor = and(customWithoutColor, not(borderColor));
        const useDefaultBackgroundColor = and(customWithoutColor);

        const cssVars = computed<CSS.Properties>(() => {
            const compositeInputColor: ButtonColorSet =
                type.value === 'custom'
                    ? {
                          color: textColor.value || color.value || BASE_COLOR_MAP.custom.color,
                          borderColor: borderColor.value || color.value || BASE_COLOR_MAP.custom.borderColor,
                          backgroundColor: color.value || BASE_COLOR_MAP.custom.backgroundColor
                      }
                    : {
                          color: BASE_COLOR_MAP[type.value!].color,
                          borderColor: BASE_COLOR_MAP[type.value!].borderColor,
                          backgroundColor: BASE_COLOR_MAP[type.value!].backgroundColor
                      };
            const { default: defaultColorSet, hover: hoverColorSet, active: activeColorSet, disabled: disabledColorSet } = useColorFactory<ButtonColorSet>(compositeInputColor);
            const buttonSizeSet: ButtonSizeSet = SIZE_MAP[size.value!];

            const sizeVars: CSS.Properties = {
                '--button-width': circle.value ? buttonSizeSet.height : 'initial',
                '--button-height': buttonSizeSet.height,
                '--button-padding': buttonSizeSet.padding,
                '--button-font-size': buttonSizeSet.fontSize,
                '--button-icon-size': buttonSizeSet.iconSize,
                '--button-icon-margin': buttonSizeSet.iconMargin,
                '--button-radius': circle.value ? '50%' : round.value ? buttonSizeSet.height : '3px'
            };

            const colorVars: CSS.Properties = isCustom.value
                ? {
                      '--button-default-color': textColorSet.value?.default ?? (useDefaultColor.value ? '#000' : or(textColor, isTransparent).value ? defaultColorSet.color : '#fff'),
                      '--button-default-border-color': borderColorSet.value?.default ?? (isNotNormal.value ? 'transparent' : useDefaultBorderColor.value ? '#e0e0e6' : defaultColorSet.borderColor),
                      '--button-default-background-color': colorSet.value?.default ?? (isTransparent.value ? 'transparent' : useDefaultBackgroundColor.value ? '#fff' : defaultColorSet.backgroundColor),

                      '--button-hover-color': textColorSet.value?.hover ?? (useDefaultColor.value ? '#059669' : or(textColor, isTransparent).value ? hoverColorSet.color : '#fff'),
                      '--button-hover-border-color': borderColorSet.value?.hover ?? (isNotNormal.value ? 'transparent' : useDefaultBorderColor.value ? '#10b981' : hoverColorSet.borderColor),
                      '--button-hover-background-color': colorSet.value?.hover ?? (isTransparent.value ? 'transparent' : useDefaultBackgroundColor.value ? '#fff' : hoverColorSet.backgroundColor),

                      '--button-active-color': textColorSet.value?.active ?? (useDefaultColor.value ? '#15803d' : or(textColor, isTransparent).value ? activeColorSet.color : '#fff'),
                      '--button-active-border-color': borderColorSet.value?.active ?? (isNotNormal.value ? 'transparent' : useDefaultBorderColor.value ? '#15803d' : activeColorSet.borderColor),
                      '--button-active-background-color': colorSet.value?.active ?? (isTransparent.value ? 'transparent' : useDefaultBackgroundColor.value ? '#fff' : activeColorSet.backgroundColor),

                      '--button-disabled-color': textColorSet.value?.disabled ?? (useDefaultColor.value ? '#aaa' : or(textColor, isTransparent).value ? disabledColorSet.color : '#fff'),
                      '--button-disabled-border-color': borderColorSet.value?.disabled ?? (isNotNormal.value ? 'transparent' : useDefaultBorderColor.value ? '#eee' : disabledColorSet.borderColor),
                      '--button-disabled-background-color': colorSet.value?.disabled ?? (isTransparent.value ? 'transparent' : useDefaultBackgroundColor.value ? '#fff' : disabledColorSet.backgroundColor)
                  }
                : {
                      '--button-default-color': isDefault.value ? '#000' : isTransparent.value ? defaultColorSet.color : '#fff',
                      '--button-default-border-color': isNotNormal.value ? 'transparent' : isDefault.value ? '#e0e0e6' : defaultColorSet.borderColor,
                      '--button-default-background-color': isTransparent.value ? 'transparent' : isDefault.value ? '#fff' : defaultColorSet.backgroundColor,

                      '--button-hover-color': isDefault.value ? '#059669' : isTransparent.value ? hoverColorSet.color : '#fff',
                      '--button-hover-border-color': isNotNormal.value ? 'transparent' : isDefault.value ? '#10b981' : hoverColorSet.borderColor,
                      '--button-hover-background-color': isTransparent.value ? 'transparent' : isDefault.value ? '#fff' : hoverColorSet.backgroundColor,

                      '--button-active-color': isDefault.value ? '#15803d' : isTransparent.value ? activeColorSet.color : '#fff',
                      '--button-active-border-color': isNotNormal.value ? 'transparent' : isDefault.value ? '#15803d' : activeColorSet.borderColor,
                      '--button-active-background-color': isTransparent.value ? 'transparent' : isDefault.value ? '#fff' : activeColorSet.backgroundColor,

                      '--button-disabled-color': isDefault.value ? '#aaa' : isTransparent.value ? disabledColorSet.color : '#fff',
                      '--button-disabled-border-color': isNotNormal.value ? 'transparent' : isDefault.value ? '#eee' : disabledColorSet.borderColor,
                      '--button-disabled-background-color': isTransparent.value ? 'transparent' : isDefault.value ? '#fff' : disabledColorSet.backgroundColor
                  };

            return {
                ...colorVars,
                ...sizeVars
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
