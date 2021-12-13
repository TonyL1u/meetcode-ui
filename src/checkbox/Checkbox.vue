<script lang="ts">
export default {
    name: 'Checkbox'
};
</script>

<script lang="ts" setup>
import { useSlots, createVNode, renderSlot, toRefs, toRaw, computed, inject } from 'vue';
import CheckMark from './CheckMark.vue';
import { useVModels } from '@vueuse/core';
import { createKey } from '../_utils_';
import { checkboxGroupInjectionKey, CheckboxValue } from './interface';

interface Props {
    value?: CheckboxValue;
    label?: string;
    checkedValue?: CheckboxValue;
    uncheckedValue?: CheckboxValue;
    disabled?: boolean;
    checked?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    checkedValue: true,
    uncheckedValue: false,
    disabled: false
});
const emit = defineEmits<{
    (e: 'update:value', value: CheckboxValue): void;
}>();

const slots = useSlots();
const key = createKey('checkbox');
const { checkedValue, uncheckedValue, checked } = toRefs(props);
const { value: valueVM } = useVModels(props, emit);
const { groupValue, updateGroupValue } = inject(checkboxGroupInjectionKey, null) ?? {};
const isChecked = computed(() => {
    if (groupValue) {
        console.log(12345);
        return groupValue.indexOf(valueVM?.value!) > -1;
    }
    console.log(valueVM?.value === checkedValue.value);
    return checked?.value ?? valueVM?.value === checkedValue.value;
});
console.log(isChecked.value);
const handleChange = () => {
    if (valueVM) {
        if (!updateGroupValue) {
            valueVM.value = valueVM?.value === checkedValue.value ? uncheckedValue.value : checkedValue.value;
        } else {
            updateGroupValue(valueVM.value);
        }
    }
};

const Render = () => {
    console.log(isChecked.value);
    return createVNode('div', { class: 'mc-checkbox' }, [
        createVNode('input', { class: 'checkbox-input', id: key, type: 'checkbox', onChange: handleChange, checked: isChecked.value }),
        createVNode('label', { class: 'checkbox', for: key }, [createVNode('span', null, [createVNode(CheckMark)]), slots.default ? createVNode('span', null, [renderSlot(slots, 'default')]) : null])
    ]);
};
</script>

<template>
    <Render />
</template>
