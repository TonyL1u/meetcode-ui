import { defineComponent, ref, createVNode, renderSlot, toRefs, computed, inject, mergeProps, onMounted, onUnmounted } from 'vue';
import { or, and, not, isDefined } from '@vueuse/core';
import { createKey, createElementVNode, PatchFlags } from '../_utils_';
import { useThemeRegister } from '../_composable_';
import { mainCssr, lightCssr, darkCssr } from './styles';
import { IconCheckMark, IconIndeterminateMark } from './icon';
import { CheckboxValue, checkboxIKey, checkboxGroupInjectionKey, checkboxProps } from './interface';
import type { StyleValue } from 'vue';

export default defineComponent({
    name: 'Checkbox',
    iKey: checkboxIKey,
    props: checkboxProps,
    emits: ['update:value'],
    setup(props, { slots, attrs, emit }) {
        // theme register
        useThemeRegister({
            key: 'Checkbox',
            main: mainCssr,
            light: lightCssr,
            dark: darkCssr
        });

        const key = createKey('checkbox');
        const { value: valueVM, label, size, checkedValue, uncheckedValue, disabled, indeterminate, checkedColor } = toRefs(props);
        const { groupValue, groupCheckedColor, groupDisabled, updateGroupValue, BusSelectAll, BusMaxControl } = inject(checkboxGroupInjectionKey, null) ?? {};
        const checkboxElRef = ref<HTMLElement>();
        const internalValue = ref<CheckboxValue>(false);
        const internalDisabled = ref(false);
        const scaleRatio = computed(() => {
            switch (size.value) {
                case 'small':
                    return 0.8;
                case 'medium':
                    return 0.9;
                case 'large':
                    return 1;
            }
        });
        const mergedValue = isDefined(valueVM) ? valueVM : internalValue;
        const mergedDisabled = or(groupDisabled, disabled, internalDisabled);
        const mergedChecked = computed(() => {
            if (groupValue?.value) {
                return groupValue.value.indexOf(mergedValue?.value!) > -1;
            }
            return mergedValue?.value === checkedValue.value;
        });
        const mergedCheckedColor = and(groupCheckedColor, not(checkedColor)).value ? groupCheckedColor : checkedColor;
        const cssVars = computed<StyleValue>(() => {
            return {
                '--checkbox-checked-color': mergedCheckedColor?.value ?? '#10b981',
                '--checkbox-hover-color': (mergedCheckedColor?.value ?? '#10b981') + '0f',
                '--checkbox-scale-size': `scale(${scaleRatio.value})`
            };
        });

        const callUpdateValue = (value: CheckboxValue) => {
            if (valueVM.value === undefined) {
                mergedValue.value = value;
            }
            emit('update:value', value);
        };

        const updateInternalDisabled = (reachMax: boolean) => {
            if (reachMax) {
                !mergedChecked.value && (internalDisabled.value = true);
            } else {
                internalDisabled.value && (internalDisabled.value = false);
            }
        };

        const handleChange = () => {
            if (updateGroupValue) {
                updateGroupValue(mergedValue.value);
            } else {
                callUpdateValue(mergedChecked.value ? uncheckedValue.value! : checkedValue.value!);
            }
        };

        if (BusMaxControl && BusSelectAll) {
            BusMaxControl.on(updateInternalDisabled);
            BusSelectAll.on((selectDisabled: boolean) => {
                if (!mergedChecked.value) {
                    if (!selectDisabled) {
                        !mergedDisabled.value && updateGroupValue?.(mergedValue?.value, false);
                    } else {
                        updateGroupValue?.(mergedValue?.value, false);
                    }
                }
            });
        }

        const labelVNode = computed(() => {
            if (slots.default) {
                return createVNode('span', null, [renderSlot(slots, 'default')]);
            } else if (label?.value) {
                return createVNode('span', null, [label.value]);
            } else {
                return null;
            }
        });

        return () => {
            const mergedProps = mergeProps(
                {
                    ref: checkboxElRef,
                    class: ['mc-checkbox', { 'mc-checkbox--checked': mergedChecked.value, 'mc-checkbox--disabled': mergedDisabled.value }],
                    style: cssVars.value
                },
                attrs
            );
            return createElementVNode(
                'div',
                mergedProps,
                [
                    createElementVNode('input', { class: 'mc-checkbox__input', value: mergedValue.value, id: key, type: 'checkbox', onChange: handleChange, checked: mergedChecked.value, disabled: mergedDisabled.value }, null, PatchFlags.PROPS, [
                        'value',
                        'checked',
                        'disabled'
                    ]),
                    createElementVNode('label', { class: 'mc-checkbox__label', for: key }, [
                        createElementVNode(
                            'span',
                            {
                                style: {
                                    background: mergedDisabled.value ? 'rgba(0, 0, 0, 0.02)' : '',
                                    borderColor: mergedDisabled.value ? '#cccfdb' : ''
                                }
                            },
                            [createVNode(indeterminate.value ? IconIndeterminateMark : IconCheckMark)],
                            PatchFlags.STYLE
                        ),
                        labelVNode.value
                    ])
                ],
                PatchFlags.FULL_PROPS
            );
        };
    }
});
