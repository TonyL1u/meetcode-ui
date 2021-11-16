<template>
    <McPopselect v-model:value="value" :options="options">
        <NButton type="primary" ghost>{{ value || '请选择' }}</NButton>
    </McPopselect>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { McPopselect } from 'meetcode-ui';
import { ref } from 'vue';

const value = ref('');
const options = ref([
    {
        label: 'test1',
        value: 'test1'
    },
    {
        label: 'test2',
        value: 'test2',
        disabled: true
    },
    {
        label: 'test3',
        value: 'test3'
    }
]);
</script>
