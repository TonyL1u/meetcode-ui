import { defineComponent, provide, toRefs, ref, createVNode, renderSlot, nextTick, onUnmounted, watch, computed, PropType } from 'vue';
import { useEventBus, EventBusKey } from '@vueuse/core';
import McCheckbox from './Checkbox';
import { flatten } from '../_utils_';
import { checkboxGroupInjectionKey, CheckboxValue, CheckboxGroupStatus, checkboxIKey, CheckboxGroupProps } from './interface';

export default defineComponent({
    props: {
        value: {
            type: Array as PropType<CheckboxGroupProps['value']>,
            default: undefined
        },
        options: {
            type: Array as PropType<CheckboxGroupProps['options']>,
            default: undefined
        },
        max: {
            type: Number as PropType<CheckboxGroupProps['max']>,
            default: undefined
        },
        disabled: {
            type: Boolean as PropType<CheckboxGroupProps['disabled']>,
            default: false
        },
        checkedColor: {
            type: String as PropType<CheckboxGroupProps['checkedColor']>,
            default: '#10b981'
        }
    },
    emits: ['update:value'],
    setup(props, { slots, emit, expose }) {
        const { value: valueVM, options, checkedColor, max, disabled } = toRefs(props);
        const checkboxGroupElRef = ref<HTMLElement>();
        const checkboxCount = computed(() => {
            const slotsCount = slots.default ? flatten(slots.default(), checkboxIKey).length : 0;
            const optionsCount = options?.value?.length ?? 0;
            return slotsCount + optionsCount;
        });
        const checkedCount = computed(() => {
            return valueVM?.value?.length ?? 0;
        });
        const status = computed<CheckboxGroupStatus>(() => {
            return {
                selectAll: checkedCount.value === checkboxCount.value,
                indeterminate: checkedCount.value > 0 && checkedCount.value < checkboxCount.value
            };
        });

        const callUpdateValue = (value?: CheckboxValue) => {
            emit('update:value', valueVM!.value!, value);
        };

        // due with max props, some logic...
        if (valueVM?.value && max?.value) {
            watch(
                [checkboxCount, checkedCount, max],
                () => {
                    void nextTick(() => {
                        if (valueVM.value?.length === max.value) {
                            BusMaxControl.emit(true);
                        } else {
                            BusMaxControl.emit(false);
                        }
                    });
                },
                {
                    immediate: true
                }
            );
        }

        const updateGroupValue = (value?: CheckboxValue, call: boolean = true) => {
            if (valueVM?.value && value !== undefined) {
                const index = valueVM.value.indexOf(value);
                if (index === -1) {
                    valueVM.value.push(value);
                } else {
                    valueVM.value.splice(index, 1);
                }
                call && callUpdateValue(value);
            }
        };

        const SelectAllEventBusKey: EventBusKey<boolean> = Symbol();
        const MaxControlEventBusKey: EventBusKey<boolean> = Symbol();
        const BusSelectAll = useEventBus<boolean>(SelectAllEventBusKey);
        const BusMaxControl = useEventBus<boolean>(MaxControlEventBusKey);

        provide(checkboxGroupInjectionKey, {
            groupValue: valueVM,
            groupCheckedColor: checkedColor,
            groupDisabled: disabled,
            updateGroupValue,
            BusSelectAll,
            BusMaxControl
        });

        expose({
            selectAll(selectDisabled: boolean = true) {
                BusSelectAll.emit(selectDisabled);
                valueVM?.value && callUpdateValue();
            },
            clear() {
                if (valueVM?.value) {
                    valueVM.value.length = 0;
                    callUpdateValue();
                }
            },
            status,
            el: checkboxGroupElRef
        });

        onUnmounted(() => {
            BusMaxControl.reset();
            BusSelectAll.reset();
        });

        return () =>
            createVNode(
                'div',
                {
                    ref: checkboxGroupElRef,
                    class: 'mc-checkbox-group'
                },
                [
                    ...(options?.value?.map(option => {
                        const { value, label, disabled } = option;

                        if (!label || typeof label === 'string') {
                            return createVNode(McCheckbox, { value, label, disabled });
                        } else {
                            return createVNode(McCheckbox, { value, disabled }, { default: label });
                        }
                    }) ?? []),
                    renderSlot(slots, 'default')
                ]
            );
    }
});
