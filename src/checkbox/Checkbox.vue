<script lang="ts">
export default {
    name: 'Checkbox'
};
</script>

<script lang="ts" setup>
import { useSlots, createVNode, renderSlot, toRefs, computed, inject } from 'vue';
import CheckMark from './CheckMark.vue';
import IndeterminateMark from './IndeterminateMark.vue';
import { useVModels } from '@vueuse/core';
import { createKey } from '../_utils_';
import { checkboxGroupInjectionKey, CheckboxValue } from './interface';
import * as CSS from 'csstype';

interface Props {
    value?: CheckboxValue;
    label?: string;
    checkedValue?: CheckboxValue;
    uncheckedValue?: CheckboxValue;
    disabled?: boolean;
    indeterminate?: boolean;
    checkedColor?: string;
}
const props = withDefaults(defineProps<Props>(), {
    checkedValue: true,
    uncheckedValue: false,
    disabled: false,
    indeterminate: false
});
const emit = defineEmits<{
    (e: 'update:value', value: CheckboxValue): void;
}>();

const slots = useSlots();
const key = createKey('checkbox');
const { checkedValue, uncheckedValue, disabled, indeterminate, checkedColor } = toRefs(props);
const { value: valueVM } = useVModels(props, emit);
const { groupValue, updateGroupValue, groupCheckedColor } = inject(checkboxGroupInjectionKey, null) ?? {};
const isChecked = computed(() => {
    if (groupValue) {
        return groupValue.indexOf(valueVM?.value!) > -1;
    }
    return valueVM?.value === checkedValue.value;
});
const cssVars = computed<CSS.Properties>(() => {
    const mergedColor = groupCheckedColor && !checkedColor?.value ? groupCheckedColor : checkedColor?.value ?? '#10b981';

    return {
        '--checkbox-checked-color': mergedColor,
        '--checkbox-hover-color': mergedColor + '0f'
    };
});

const handleChange = () => {
    if (valueVM) {
        if (!updateGroupValue) {
            valueVM.value = isChecked.value ? uncheckedValue.value : checkedValue.value;
        } else {
            updateGroupValue(valueVM.value);
        }
    }
};

const Render = () => {
    return createVNode(
        'div',
        {
            class: ['mc-checkbox', { 'mc-checkbox--disabled': disabled.value }],
            style: cssVars.value
        },
        [
            createVNode('input', { class: 'checkbox-input', id: key, type: 'checkbox', onChange: handleChange, checked: isChecked.value, disabled: disabled.value }),
            createVNode('label', { class: 'checkbox', for: key }, [
                createVNode(
                    'span',
                    {
                        style: { background: disabled.value ? 'rgba(0, 0, 0, 0.02)' : '', borderColor: disabled.value ? '#cccfdb' : '' }
                    },
                    [createVNode(indeterminate.value ? IndeterminateMark : CheckMark)]
                ),
                slots.default ? createVNode('span', null, [renderSlot(slots, 'default')]) : null
            ])
        ]
    );
};
</script>

<template>
    <Render />
</template>
