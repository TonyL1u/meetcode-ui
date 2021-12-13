<script lang="ts" setup>
import { provide, toRefs, createVNode, useSlots, renderSlot } from 'vue';
import { useVModels } from '@vueuse/core';
import McCheckbox from './Checkbox.vue';
import { checkboxGroupInjectionKey, CheckboxValue, CheckboxGroupOptions } from './interface';

interface Props {
    value?: CheckboxValue[];
    options?: CheckboxGroupOptions[];
    disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    disabled: false
});
const emit = defineEmits<{
    (e: 'update:value', value: CheckboxValue[]): void;
}>();

const slots = useSlots();
const { options } = toRefs(props);
const { value: valueVM } = useVModels(props, emit);
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
</script>

<template>
    <Render />
</template>
