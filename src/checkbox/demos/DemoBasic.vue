<template>
    <McCheckbox v-model:value="value">Apples</McCheckbox>
    {{ value }}
    <!-- 
    <McCheckboxGroup v-model:value="groupValue" :options="options">
        <McCheckbox value="grape">Grape</McCheckbox>
    </McCheckboxGroup>

    <McCheckboxGroup v-model:value="groupValue">
        <McCheckbox value="apple">Apple</McCheckbox>
        <McCheckbox value="orange">Orange</McCheckbox>
        <McCheckbox value="banana">Banana</McCheckbox>
        <McCheckbox value="grape">Grape</McCheckbox>
    </McCheckboxGroup> -->
    {{ groupValue }}
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McCheckboxGroup, McCheckbox, CheckboxGroupOptions } from 'meetcode-ui';

const value = ref(true);
const groupValue = ref(['apple', 'orange', 'banana', 'grape']);
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
