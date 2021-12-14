<script lang="ts" setup>
import { provide, toRefs, createVNode, useSlots, renderSlot, nextTick, onUnmounted, watch, computed } from 'vue';
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
const checkedCount = computed(() => {
    return valueVM?.value?.length ?? 0;
});

const updateGroupValue = (value?: CheckboxValue) => {
    if (valueVM?.value && value) {
        const index = valueVM.value.indexOf(value);
        if (index === -1) {
            valueVM.value.push(value);
        } else {
            valueVM.value.splice(index, 1);
        }
    }
};

provide(checkboxGroupInjectionKey, {
    groupValue: valueVM,
    groupCheckedColor: checkedColor,
    groupDisabled: disabled,
    updateGroupValue
});

void nextTick(() => {
    if (valueVM?.value && max?.value) {
        watch(
            checkedCount,
            () => {
                if (valueVM.value?.length === max.value) {
                    DisabledBus.emit(true);
                } else {
                    DisabledBus.emit(false);
                }
            },
            {
                immediate: true
            }
        );
    }
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

defineExpose({
    selectAll() {
        CheckedBus.emit();
    }
});

onUnmounted(() => {
    DisabledBus.reset();
    CheckedBus.reset();
});
</script>

<template>
    <Render />
</template>
