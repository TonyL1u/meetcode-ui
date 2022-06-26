import { defineComponent, onMounted, toRefs, ref, computed } from 'vue';
import { or, and, not, isDefined } from '@vueuse/core';
import { useThemeRegister, propsMergeSlots, setColorAlpha, createElementVNode, createComponentVNode, createKey, cssUnitTransform, renderSlot, PatchFlags } from '../_utils_';
import { McBaseLoading } from '../_internal_';
import { McIconSwitchTransition } from '../_transition_';
import { mainCssr, lightCssr, darkCssr } from './styles';
import { switchProps } from './interface';
import type { SwitchSizeMap, SwitchProps } from './interface';
import * as CSS from 'csstype';

const SIZE_MAP: SwitchSizeMap = {
    small: {
        labelHeight: '18px',
        labelMinWidth: '36px',
        handlerSize: '14px',
        fontSize: '12px',
        textCheckedPadding: '0px 22px 0px 6px',
        textUncheckedPadding: '0px 6px 0px 22px'
    },
    medium: {
        labelHeight: '22px',
        labelMinWidth: '44px',
        handlerSize: '18px',
        fontSize: '14px',
        textCheckedPadding: '0px 26px 0px 10px',
        textUncheckedPadding: '0px 10px 0px 26px'
    },
    large: {
        labelHeight: '26px',
        labelMinWidth: '52px',
        handlerSize: '22px',
        fontSize: '16px',
        textCheckedPadding: '0px 30px 0px 14px',
        textUncheckedPadding: '0px 14px 0px 30px'
    }
};

export default defineComponent({
    name: 'Switch',
    props: switchProps,
    emits: ['update:value', 'switch'],
    setup(props, { slots, emit, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McSwitch',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });
        const key = createKey('switch');
        const { value: valueVM, disabled, size, checkedValue, uncheckedValue, checkedText, uncheckedText, checkedColor, uncheckedColor, handlerColor, textPlacement, square, checked, onBeforeSwitch, loading, inelastic, width } = toRefs(props);
        const switchElRef = ref<HTMLElement>();
        const internalValue = ref(checked.value!);
        const mergedValue = isDefined(valueVM) ? valueVM : internalValue;
        const isChecked = computed(() => mergedValue.value === checkedValue.value);
        const showInnerText = computed(() => textPlacement.value === 'both' || textPlacement.value === 'in');
        const showOuterText = computed(() => textPlacement.value === 'both' || textPlacement.value === 'out');
        const showCheckedText = computed(() => !!(checkedText.value || slots['checked-text'] || slots['checkedText']));
        const showUncheckedText = computed(() => !!(uncheckedText.value || slots['unchecked-text'] || slots['uncheckedText']));
        const cssVars = computed<CSS.Properties>(() => {
            const { labelHeight, labelMinWidth, handlerSize, fontSize, textUncheckedPadding, textCheckedPadding } = SIZE_MAP[size.value!] ?? SIZE_MAP.medium;

            return {
                '--switch-checked-color': checkedColor.value,
                '--switch-unchecked-color': uncheckedColor.value,
                '--switch-handler-color': handlerColor.value,
                '--switch-ripple-color': setColorAlpha(checkedColor.value!, 0),
                '--switch-font-size': fontSize,
                '--switch-label-height': labelHeight,
                '--switch-label-width': cssUnitTransform(width.value),
                '--switch-label-min-width': width.value ? cssUnitTransform(width.value) : labelMinWidth,
                '--switch-label-border-radius': square.value ? '3px' : labelHeight,
                '--switch-text-checked-padding': textCheckedPadding,
                '--switch-text-unchecked-padding': textUncheckedPadding,
                '--switch-handler-size': handlerSize,
                '--switch-handler-border-radius': square.value ? '3px' : handlerSize
            };
        });

        const callUpdateValue = () => {
            const value = isChecked.value ? uncheckedValue.value! : checkedValue.value!;
            if (isDefined(valueVM)) {
                emit('update:value', value);
            } else {
                mergedValue.value = value;
            }
            emit('switch', value);
        };
        const handleChange = async () => {
            if (disabled.value) return;

            try {
                const callback = await onBeforeSwitch.value?.();
                if (callback || callback === undefined) {
                    callUpdateValue();
                }
            } catch (error) {}
        };
        const innerCheckedText = () => {
            return and(isChecked, showCheckedText).value ? createElementVNode('span', { class: 'mc-switch-label__content' }, propsMergeSlots<SwitchProps, 'checkedText'>(props, slots, 'checkedText')) : null;
        };
        const innerUncheckedText = () => {
            return and(not(isChecked), showUncheckedText).value ? createElementVNode('span', { class: 'mc-switch-label__content' }, propsMergeSlots<SwitchProps, 'uncheckedText'>(props, slots, 'uncheckedText')) : null;
        };

        expose({
            el: switchElRef.value,
            switch: callUpdateValue
        });

        // main logic...
        return () =>
            createElementVNode(
                'div',
                {
                    ref_key: 'switchElRef',
                    ref: switchElRef,
                    class: [
                        'mc-switch',
                        `mc-switch--${size.value}`,
                        {
                            'mc-switch--checked': isChecked.value,
                            'mc-switch--disabled': disabled.value,
                            'mc-switch--square': square.value,
                            'mc-switch--loading': loading.value,
                            'mc-switch--inelastic': inelastic.value
                        }
                    ],
                    style: cssVars.value
                },
                [
                    createElementVNode('input', { class: 'mc-switch-input', value: mergedValue.value, id: key, type: 'checkbox', checked: isChecked.value, disabled: disabled.value, onChange: handleChange }, null, PatchFlags.PROPS, [
                        'value',
                        'checked',
                        'disabled'
                    ]),
                    and(showUncheckedText, showOuterText).value ? createElementVNode('span', { class: 'mc-switch-label-text--left', onClick: handleChange }, [propsMergeSlots<SwitchProps, 'uncheckedText'>(props, slots, 'uncheckedText')]) : null,
                    createElementVNode('label', { class: 'mc-switch-label', for: key }, [
                        showInnerText.value ? innerCheckedText() ?? innerUncheckedText() : null,
                        createElementVNode('div', { class: 'mc-switch-label__handler' }, [
                            createComponentVNode(McIconSwitchTransition, null, {
                                default: () => {
                                    if (loading.value) {
                                        return createComponentVNode(McBaseLoading, { size: 14 });
                                    } else if (slots.icon) {
                                        return renderSlot(slots, 'icon');
                                    } else {
                                        return isChecked.value ? renderSlot(slots, 'checked-icon') : renderSlot(slots, 'unchecked-icon');
                                    }
                                }
                            })
                        ])
                    ]),
                    and(showCheckedText, showOuterText).value ? createElementVNode('span', { class: 'mc-switch-label-text--right', onClick: handleChange }, [propsMergeSlots<SwitchProps, 'checkedText'>(props, slots, 'checkedText')]) : null
                ],
                PatchFlags.CLASS | PatchFlags.STYLE
            );
    }
});
