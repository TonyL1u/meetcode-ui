import { defineComponent, createVNode, renderSlot, ref, computed, toRefs, onMounted } from 'vue';
import { ButtonColorSet, ButtonSizeSet, ButtonSizeMap, buttonProps, buttonIKey } from './interface';
import { or, and, not } from '@vueuse/core';
import { useColorFactory, setColorAlpha, useThemeRegister } from '../_utils_';
import { buttonColorMap, defaultButtonColorMap } from './color';
import { mainCssr } from './styles';
import * as CSS from 'csstype';

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
    iKey: buttonIKey,
    props: buttonProps,
    setup(props, { slots, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McButton',
                main: mainCssr
            });
        });

        const { type, size, disabled, ghost, dashed, render, round, circle, block, loading, iconRight, color, textColor, borderColor, colorSet, textColorSet, borderColorSet } = toRefs(props);
        const buttonElRef = ref<HTMLElement>();
        const isRippling = ref(false);
        const isDefault = computed(() => type.value === 'default');
        const isCustom = computed(() => type.value === 'custom');
        const isNotNormal = computed(() => render.value !== 'normal');
        const isTransparent = or(ghost, dashed, isNotNormal.value);

        const customWithoutColor = and(isCustom, not(color));
        const useDefaultColor = and(customWithoutColor, not(textColor));
        const useDefaultBorderColor = and(customWithoutColor, not(borderColor));
        const useDefaultBackgroundColor = and(customWithoutColor);

        const cssVars = computed<CSS.Properties>(() => {
            const { value: buttonColor } = buttonColorMap;

            const compositeInputColor: ButtonColorSet =
                type.value === 'custom'
                    ? {
                          color: textColor.value || color.value || buttonColor.custom.color,
                          borderColor: borderColor.value || color.value || buttonColor.custom.borderColor,
                          backgroundColor: color.value || buttonColor.custom.backgroundColor
                      }
                    : {
                          color: buttonColor[type.value!].color,
                          borderColor: buttonColor[type.value!].borderColor,
                          backgroundColor: buttonColor[type.value!].backgroundColor
                      };
            const { default: defaultColorSet, hover: hoverColorSet, active: activeColorSet, disabled: disabledColorSet } = useColorFactory<ButtonColorSet>(compositeInputColor);
            const { default: defaultButtonDefaultColorSet, hover: defaultButtonHoverColorSet, active: defaultButtonActiveColorSet, disabled: defaultButtonDisabledColorSet } = defaultButtonColorMap.value;
            const buttonSizeSet: ButtonSizeSet = SIZE_MAP[size.value!];

            const sizeVars: CSS.Properties = {
                '--button-width': circle.value ? buttonSizeSet.height : block.value ? '100%' : 'initial',
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
                      '--button-default-color': isDefault.value ? defaultButtonDefaultColorSet.color : isTransparent.value ? defaultColorSet.color : defaultButtonDefaultColorSet.backgroundColor,
                      '--button-default-border-color': isNotNormal.value ? 'transparent' : isDefault.value ? defaultButtonDefaultColorSet.borderColor : defaultColorSet.borderColor,
                      '--button-default-background-color': isTransparent.value ? 'transparent' : isDefault.value ? defaultButtonDefaultColorSet.backgroundColor : defaultColorSet.backgroundColor,

                      '--button-hover-color': isDefault.value ? defaultButtonHoverColorSet.color : isTransparent.value ? hoverColorSet.color : defaultButtonHoverColorSet.backgroundColor,
                      '--button-hover-border-color': isNotNormal.value ? 'transparent' : isDefault.value ? defaultButtonHoverColorSet.borderColor : hoverColorSet.borderColor,
                      '--button-hover-background-color': isTransparent.value ? 'transparent' : isDefault.value ? defaultButtonHoverColorSet.backgroundColor : hoverColorSet.backgroundColor,

                      '--button-active-color': isDefault.value ? defaultButtonActiveColorSet.color : isTransparent.value ? activeColorSet.color : defaultButtonActiveColorSet.backgroundColor,
                      '--button-active-border-color': isNotNormal.value ? 'transparent' : isDefault.value ? defaultButtonActiveColorSet.borderColor : activeColorSet.borderColor,
                      '--button-active-background-color': isTransparent.value ? 'transparent' : isDefault.value ? defaultButtonActiveColorSet.backgroundColor : activeColorSet.backgroundColor,

                      '--button-disabled-color': isDefault.value ? defaultButtonDisabledColorSet.color : isTransparent.value ? disabledColorSet.color : defaultButtonDisabledColorSet.backgroundColor,
                      '--button-disabled-border-color': isNotNormal.value ? 'transparent' : isDefault.value ? defaultButtonDisabledColorSet.borderColor : disabledColorSet.borderColor,
                      '--button-disabled-background-color': isTransparent.value ? 'transparent' : isDefault.value ? defaultButtonDisabledColorSet.backgroundColor : disabledColorSet.backgroundColor
                  };

            return {
                ...colorVars,
                ...sizeVars,
                '--button-ripple-color': setColorAlpha(colorVars['--button-active-border-color']!, 0),
                '--button-flex-direction': iconRight.value ? 'row-reverse' : 'row'
            };
        });

        const iconVNode = computed(() => {
            return loading.value
                ? createVNode('span', { class: ['mc-button__icon-loading', iconRight.value ? 'right' : 'left'] })
                : slots.icon
                ? createVNode('span', { class: ['mc-button__icon', iconRight.value ? 'right' : 'left'] }, [renderSlot(slots, 'icon')])
                : null;
        });

        const contentVNode = computed(() => {
            return slots.default ? createVNode('span', { class: 'mc-button__content' }, [renderSlot(slots, 'default')]) : null;
        });

        expose({
            el: buttonElRef
        });

        return () =>
            createVNode(
                'button',
                {
                    ref: buttonElRef,
                    class: [
                        'mc-button',
                        `mc-button--${render.value}`,
                        `mc-button--${type.value}`,
                        `mc-button--${size.value}`,
                        {
                            'mc-button--block': block.value,
                            'mc-button--disabled': disabled.value,
                            'mc-button--ghost': ghost.value,
                            'mc-button--dashed': dashed.value,
                            'mc-button--round': round.value,
                            'mc-button--circle': circle.value,
                            'mc-button--rippling': isRippling.value
                        }
                    ],
                    disabled: disabled.value,
                    style: cssVars.value,
                    onMousedown() {
                        if (isRippling.value) isRippling.value = false;
                    },
                    onClick() {
                        isRippling.value = true;
                    },
                    onAnimationend(e: AnimationEvent) {
                        if (e.animationName === 'mc-button-border-ripple-out') {
                            isRippling.value = false;
                        }
                    }
                },
                [iconVNode.value, contentVNode.value]
            );
    }
});
