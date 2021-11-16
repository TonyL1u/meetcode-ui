<template>
    <McPopselect v-model:value="value" :options="options" :max-height="250">
        <NButton type="primary" ghost>{{ value }}</NButton>
    </McPopselect>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { McPopselect } from 'meetcode-ui';
import { ref } from 'vue';

const value = ref('test1');
const options = ref([
    {
        label: 'test1',
        value: 'test1'
    },
    {
        label: 'test2',
        value: 'test2'
    },
    {
        label: 'test3',
        value: 'test3'
    },
    {
        label: 'test4',
        value: 'test4'
    },
    {
        label: 'test5',
        value: 'test5'
    },
    {
        label: 'test6',
        value: 'test6'
    },
    {
        label: 'test7',
        value: 'test7'
    },
    {
        label: 'test8',
        value: 'test8'
    },
    {
        label: 'test9',
        value: 'test9'
    },
    {
        label: 'test10',
        value: 'test10'
    }
]);
</script>
