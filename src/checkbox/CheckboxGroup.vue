<script lang="ts" setup>
import { provide, toRefs, createVNode, useSlots, renderSlot, onUnmounted } from 'vue';
import { useVModels } from '@vueuse/core';
import McCheckbox from './Checkbox.vue';
import { checkboxGroupInjectionKey, CheckboxValue, CheckboxGroupOptions, checkboxInternalEmitter } from './interface';

interface Props {
    value?: CheckboxValue[];
    options?: CheckboxGroupOptions[];
    max?: number;
    disabled?: boolean;
    checkedColor?: string;
}
const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    checkedColor: '#10b981'
});
const emit = defineEmits<{
    (e: 'update:value', value: CheckboxValue[]): void;
}>();

const slots = useSlots();
const { CheckedBus, DisabledBus } = checkboxInternalEmitter;
const { options, checkedColor, max, disabled } = toRefs(props);
const { value: valueVM } = useVModels(props, emit);
const updateGroupValue = (value?: CheckboxValue) => {
    if (valueVM?.value && value) {
        const index = valueVM.value.indexOf(value);
        if (index === -1) {
            valueVM.value.push(value);
        } else {
            valueVM.value.splice(index, 1);
        }

        if (max?.value) {
            if (valueVM.value?.length === max.value) {
                DisabledBus.emit(true);
            } else if (valueVM.value?.length < max.value) {
                DisabledBus.emit(false);
            }
        }
    }
};

const selectAll = (selectDisabled: boolean = false) => {};

provide(checkboxGroupInjectionKey, {
    groupValue: valueVM,
    groupCheckedColor: checkedColor,
    groupDisabled: disabled,
    updateGroupValue
});

const Render = () => {
    return createVNode(
        'div',
        {
            class: 'mc-checkbox-group'
        },
        [
            ...(options?.value?.map(option => {
                const { value, label } = option;

                return createVNode(McCheckbox, { value }, { default: () => label });
            }) ?? [null]),
            renderSlot(slots, 'default')
        ]
    );
};

onUnmounted(() => {
    DisabledBus.reset();
});
</script>

<template>
    <Render />
</template>
