<script lang="ts" setup>
import { provide, toRefs, createVNode, useSlots, renderSlot, nextTick, onUnmounted, watch, computed } from 'vue';
import { useVModels, useEventBus } from '@vueuse/core';
import McCheckbox from './Checkbox.vue';
import { checkboxGroupInjectionKey, CheckboxValue, CheckboxGroupOptions } from './interface';

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
const { options, checkedColor, max, disabled } = toRefs(props);
const { value: valueVM } = useVModels(props, emit);
const checkboxCount = computed(() => {
    return options?.value?.length ?? 0;
});
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

const SelectAllBus = useEventBus<boolean>('select-all');
const UpdateDisabledBus = useEventBus<boolean>('update-internal-disabled');

provide(checkboxGroupInjectionKey, {
    groupValue: valueVM,
    groupCheckedColor: checkedColor,
    groupDisabled: disabled,
    updateGroupValue,
    SelectAllBus,
    UpdateDisabledBus
});

void nextTick(() => {
    if (valueVM?.value && max?.value) {
        watch(
            [checkboxCount, checkedCount],
            () => {
                void nextTick(() => {
                    if (valueVM.value?.length === max.value) {
                        UpdateDisabledBus.emit(true);
                    } else {
                        UpdateDisabledBus.emit(false);
                    }
                });
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
    selectAll(selectDisabled: boolean = true) {
        SelectAllBus.emit(selectDisabled);
    }
});

onUnmounted(() => {
    UpdateDisabledBus.reset();
    SelectAllBus.reset();
});
</script>

<template>
    <Render />
</template>
