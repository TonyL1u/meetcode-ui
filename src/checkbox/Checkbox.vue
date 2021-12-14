<script lang="ts">
export default {
    name: 'Checkbox'
};
</script>

<script lang="ts" setup>
import { ref, useSlots, createVNode, renderSlot, toRefs, computed, inject } from 'vue';
import CheckMark from './CheckMark.vue';
import IndeterminateMark from './IndeterminateMark.vue';
import { useVModels, or, and, not } from '@vueuse/core';
import { createKey } from '../_utils_';
import { checkboxGroupInjectionKey, CheckboxValue, checkboxInternalEmitter } from './interface';
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
const { CheckedBus, DisabledBus } = checkboxInternalEmitter;
const key = createKey('checkbox');
const { checkedValue, uncheckedValue, disabled, indeterminate, checkedColor } = toRefs(props);
const { groupValue, groupCheckedColor, groupDisabled, updateGroupValue } = inject(checkboxGroupInjectionKey, null) ?? {};
const { value: valueVM } = useVModels(props, emit);
const internalChecked = ref(false);
const internalDisabled = ref(false);
const mergedDisabled = or(groupDisabled, disabled, internalDisabled);
const mergedChecked = computed(() => {
    if (groupValue?.value) {
        return groupValue.value.indexOf(valueVM?.value!) > -1 || internalChecked.value;
    }
    return valueVM?.value === checkedValue.value || internalChecked.value;
});
const mergedCheckedColor = and(groupCheckedColor, not(checkedColor)).value ? groupCheckedColor : checkedColor;
const cssVars = computed<CSS.Properties>(() => {
    return {
        '--checkbox-checked-color': mergedCheckedColor?.value ?? '#10b981',
        '--checkbox-hover-color': (mergedCheckedColor?.value ?? '#10b981') + '0f'
    };
});

const updateInternalChecked = (checked: boolean) => {
    internalChecked.value = checked;
};

const updateInternalDisabled = (reachMax: boolean) => {
    if (reachMax) {
        !mergedChecked.value && (internalDisabled.value = true);
    } else {
        internalDisabled.value && (internalDisabled.value = false);
    }
};

const handleChange = () => {
    if (valueVM) {
        if (!updateGroupValue) {
            valueVM.value = mergedChecked.value ? uncheckedValue.value : checkedValue.value;
        } else {
            updateGroupValue(valueVM.value);
        }
    }
};

DisabledBus.on(updateInternalDisabled);
CheckedBus.on(updateInternalChecked);

const Render = () => {
    return createVNode(
        'div',
        {
            class: ['mc-checkbox', { 'mc-checkbox--disabled': mergedDisabled.value }],
            style: cssVars.value
        },
        [
            createVNode('input', { class: 'checkbox-input', id: key, type: 'checkbox', onChange: handleChange, checked: mergedChecked.value, disabled: mergedDisabled.value }),
            createVNode('label', { class: 'checkbox', for: key }, [
                createVNode(
                    'span',
                    {
                        style: { background: mergedDisabled.value ? 'rgba(0, 0, 0, 0.02)' : '', borderColor: mergedDisabled.value ? '#cccfdb' : '' }
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
