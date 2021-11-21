<template>
    <McPopselect v-model:value="value" :options="options">
        <NButton type="primary" ghost @click="options.push({ label: 'test4', value: 'test4' })">{{ value || '请选择' }}</NButton>
    </McPopselect>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { McPopselect } from 'meetcode-ui';

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
