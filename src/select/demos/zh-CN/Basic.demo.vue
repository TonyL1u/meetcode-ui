<markdown>
### 基础用法
</markdown>

<template>
    <McSelect v-model:value="value" :options="options" clearable>
        <template #clear>
            <div>1</div>
        </template>
        <template #up>
            <div>2</div>
        </template>
    </McSelect>
    {{ value }}
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSelect } from 'meetcode-ui';

const value = ref(null);
const options = [
    { label: 'HTML', value: 1 },
    { label: 'JS', value: 2 },
    { label: 'CSS', value: 3, disabled: true },
    { label: 'VUE', value: 4 }
];
</script>
