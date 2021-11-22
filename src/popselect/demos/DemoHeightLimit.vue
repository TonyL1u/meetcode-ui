<template>
    <McPopselect v-model:value="value" :options="options" :max-height="250" trigger="click">
        <NButton type="primary" ghost>{{ value }}</NButton>
    </McPopselect>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { McPopselect } from 'meetcode-ui';

const value = ref('test15');
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
    },
    {
        label: 'test11',
        value: 'test11'
    },
    {
        label: 'test12',
        value: 'test12'
    },
    {
        label: 'test13',
        value: 'test13'
    },
    {
        label: 'test14',
        value: 'test14'
    },
    {
        label: 'test15',
        value: 'test15'
    },
    {
        label: 'test16',
        value: 'test16'
    },
    {
        label: 'test17',
        value: 'test18'
    },
    {
        label: 'test18',
        value: 'test18'
    },
    {
        label: 'test19',
        value: 'test19'
    },
    {
        label: 'test20',
        value: 'test20'
    }
]);
</script>
