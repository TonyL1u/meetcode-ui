<markdown>
### 多选
</markdown>

<template>
    <McPopselect v-model:value="value" :options="options" trigger="click" multiple>
        <McButton type="success" ghost>{{ value }}</McButton>
    </McPopselect>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McPopselect, McButton } from 'meetcode-ui';

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
