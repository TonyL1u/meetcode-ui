<template>
    <McCheckbox v-model:value="value" disabled indeterminate>Apples</McCheckbox>
    {{ value }}

    <!-- <McCheckboxGroup v-model:value="groupValue" :options="options" checked-color="#3B82F6" disabled>
        <McCheckbox value="grape">Grape</McCheckbox>
    </McCheckboxGroup> -->

    <McCheckboxGroup v-model:value="groupValue" :max="3">
        <McCheckbox value="apple">Apple</McCheckbox>
        <McCheckbox value="orange">Orange</McCheckbox>
        <McCheckbox value="banana">Banana</McCheckbox>
        <McCheckbox value="grape">Grape</McCheckbox>
    </McCheckboxGroup>
    {{ groupValue }}
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McCheckboxGroup, McCheckbox, CheckboxGroupOptions } from 'meetcode-ui';

const value = ref(true);
const groupValue = ref(['apple', 'orange', 'grape']);
const options = ref<CheckboxGroupOptions[]>([
    {
        value: 'apple',
        label: 'Apple'
    },
    {
        value: 'orange',
        label: 'Orange'
    },
    {
        value: 'banana',
        label: 'Banana'
    }
]);
</script>
