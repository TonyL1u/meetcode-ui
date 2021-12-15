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
import { checkboxGroupInjectionKey, CheckboxValue, CheckboxSize } from './interface';
import * as CSS from 'csstype';

interface Props {
    value?: CheckboxValue;
    label?: string;
    size?: CheckboxSize;
    checkedValue?: CheckboxValue;
    uncheckedValue?: CheckboxValue;
    disabled?: boolean;
    indeterminate?: boolean;
    checkedColor?: string;
}
const props = withDefaults(defineProps<Props>(), {
    size: 'medium',
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
const { size, checkedValue, uncheckedValue, disabled, indeterminate, checkedColor } = toRefs(props);
const { groupValue, groupCheckedColor, groupDisabled, updateGroupValue, SelectAllBus, UpdateDisabledBus } = inject(checkboxGroupInjectionKey, null) ?? {};
const { value: valueVM } = useVModels(props, emit);
const internalDisabled = ref(false);
const scaleRate = computed(() => {
    switch (size.value) {
        case 'small':
            return 0.8;
        case 'medium':
            return 0.9;
        case 'large':
            return 1;
    }
});
const mergedDisabled = or(groupDisabled, disabled, internalDisabled);
const mergedChecked = computed(() => {
    if (groupValue?.value) {
        return groupValue.value.indexOf(valueVM?.value!) > -1;
    }
    return valueVM?.value === checkedValue.value;
});
const mergedCheckedColor = and(groupCheckedColor, not(checkedColor)).value ? groupCheckedColor : checkedColor;
const cssVars = computed<CSS.Properties>(() => {
    return {
        '--checkbox-checked-color': mergedCheckedColor?.value ?? '#10b981',
        '--checkbox-hover-color': (mergedCheckedColor?.value ?? '#10b981') + '0f',
        '--checkbox-scale-size': `scale(${scaleRate.value})`
    };
});

const updateInternalDisabled = (reachMax: boolean) => {
    if (reachMax) {
        console.log(valueVM?.value, mergedChecked.value);
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

if (UpdateDisabledBus && SelectAllBus) {
    UpdateDisabledBus.on(updateInternalDisabled);
    SelectAllBus.on((selectDisabled: boolean) => {
        if (!mergedChecked.value) {
            if (!selectDisabled) {
                !mergedDisabled.value && updateGroupValue?.(valueVM?.value);
            } else {
                updateGroupValue?.(valueVM?.value);
            }
        }
    });
}

const Render = () => {
    console.log(mergedDisabled.value);
    console.log(groupDisabled, disabled, internalDisabled);
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
                        style: {
                            background: mergedDisabled.value ? 'rgba(0, 0, 0, 0.02)' : '',
                            borderColor: mergedDisabled.value ? '#cccfdb' : ''
                        }
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
