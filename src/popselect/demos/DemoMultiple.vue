<template>
    <McPopselect v-model:value="value" :options="options" trigger="click" multiple>
        <NButton type="primary" ghost>{{ value }}</NButton>
    </McPopselect>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { McPopselect } from 'meetcode-ui';
import { ref } from 'vue';

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
