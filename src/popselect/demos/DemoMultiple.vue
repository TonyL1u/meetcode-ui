<template>
    <McPopselect v-model:value="value" :options="options" trigger="click" :multiple="true">
        <NButton type="primary" ghost>{{ value }}</NButton>
    </McPopselect>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { McPopselect } from 'meetcode-ui';

const value = ref(['test2']);
const options = ref([
    {
        label: 'test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1',
        value: 'test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1'
    },
    {
        label: 'test2',
        value: 'test2'
    },
    {
        label: 'test3',
        value: 'test3'
    }
]);
</script>
