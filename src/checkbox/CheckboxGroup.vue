<script lang="ts" setup>
import { provide, toRefs, createVNode, useSlots, renderSlot, nextTick, onUnmounted, watch, computed } from 'vue';
import { useVModels, useEventBus } from '@vueuse/core';
import McCheckbox from './Checkbox.vue';
import { flatten } from '../_utils_';
import { checkboxGroupInjectionKey, CheckboxValue, CheckboxGroupOptions, CheckboxGroupStatus, checkboxIKey } from './interface';

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
    (e: 'update:value', groupValue: CheckboxValue[], value: CheckboxValue, status: CheckboxGroupStatus): void;
}>();

const slots = useSlots();
const { options, checkedColor, max, disabled } = toRefs(props);
const { value: valueVM } = useVModels(props, emit);
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

const updateGroupValue = (value?: CheckboxValue) => {
    if (valueVM?.value && value !== undefined) {
        const index = valueVM.value.indexOf(value);
        if (index === -1) {
            valueVM.value.push(value);
        } else {
            valueVM.value.splice(index, 1);
        }
        emit('update:value', valueVM.value, value, status.value);
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
    },
    status
});

onUnmounted(() => {
    UpdateDisabledBus.reset();
    SelectAllBus.reset();
});
</script>

<template>
    <Render />
</template>
