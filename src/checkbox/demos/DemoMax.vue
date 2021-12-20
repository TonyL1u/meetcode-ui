<template>
    <McCheckboxGroup v-model:value="groupValue" :options="options" :max="2"></McCheckboxGroup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McCheckboxGroup } from 'meetcode-ui';

const groupValue = ref([]);
const options = [
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
    },
    {
        value: 'grape',
        label: 'Grape'
    }
];
</script>
