import { defineComponent, ref, createVNode, renderSlot, toRefs, computed, inject, mergeProps, onUnmounted } from 'vue';
import CheckMark from './CheckMark.vue';
import IndeterminateMark from './IndeterminateMark.vue';
import { or, and, not, isDefined } from '@vueuse/core';
import { createKey } from '../_utils_';
import { CheckboxValue, checkboxIKey, checkboxGroupInjectionKey, checkboxProps } from './interface';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'Checkbox',
    iKey: checkboxIKey,
    props: checkboxProps,
    emits: ['update:value'],
    setup(props, { slots, attrs, emit }) {
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
        const cssVars = computed<CSS.Properties>(() => {
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

        onUnmounted(() => {});

        return () => {
            const mergedProps = mergeProps(
                {
                    ref: checkboxElRef,
                    class: ['mc-checkbox', { 'mc-checkbox--checked': mergedChecked.value, 'mc-checkbox--disabled': mergedDisabled.value }],
                    style: cssVars.value
                },
                attrs
            );
            return createVNode('div', mergedProps, [
                createVNode('input', { class: 'checkbox-input', value: mergedValue.value, id: key, type: 'checkbox', onChange: handleChange, checked: mergedChecked.value, disabled: mergedDisabled.value }),
                createVNode('label', { class: 'checkbox', for: key }, [
                    createVNode(
                        'span',
                        {
                            style: {
                                background: mergedDisabled.value ? 'rgba(0, 0, 0, 0.02)' : '',
                                borderColor: mergedDisabled.value ? '#cccfdb' : ''
                            }
                        },
                        [createVNode(indeterminate.value ? IndeterminateMark : CheckMark)]
                    ),
                    labelVNode.value
                ])
            ]);
        };
    }
});
