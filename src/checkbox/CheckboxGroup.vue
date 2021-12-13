<script lang="ts" setup>
import { provide, toRefs, computed, createVNode, useSlots, renderSlot } from 'vue';
import { useVModels } from '@vueuse/core';
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
const checkboxMergedDisabled = computed(() => {
    if (disabled.value) return true;
    if (max?.value && valueVM?.value?.length === max?.value) {
    }
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
    groupValue: valueVM?.value,
    updateGroupValue,
    groupCheckedColor: checkedColor.value
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
</script>

<template>
    <Render />
</template>
