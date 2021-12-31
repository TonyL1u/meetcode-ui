<template>
    <McCheckbox @update:value="handleUpdateValue">Checkbox</McCheckbox>

    <McCheckboxGroup @update:value="handleUpdateGroupValue">
        <McCheckbox value="apple">Apple</McCheckbox>
        <McCheckbox value="orange">Orange</McCheckbox>
        <McCheckbox value="banana">Banana</McCheckbox>
        <McCheckbox value="grape">Grape</McCheckbox>
    </McCheckboxGroup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McCheckboxGroup, McCheckbox, CheckboxValue, McMessage } from 'meetcode-ui';

const value = ref(false);
const groupValue = ref([]);

const handleUpdateValue = (value: CheckboxValue) => {
    value ? McMessage.success(value.toString()) : McMessage.error(value.toString());
};
const handleUpdateGroupValue = (groupValue?: CheckboxValue[]) => {
    McMessage.text(JSON.stringify(groupValue));
};
</script>
