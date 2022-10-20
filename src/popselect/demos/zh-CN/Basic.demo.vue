<markdown>
### 基础用法
</markdown>

<template>
    <McPopselect v-model:value="value" :options="options">
        <McButton type="success" ghost>{{ value || '请选择' }}</McButton>
    </McPopselect>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McPopselect, McButton } from 'meetcode-ui';

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
