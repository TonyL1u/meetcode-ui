<markdown>
### 高度限制

选项过多时，可以为弹出框设置一个最大高度，列表内容超出该高度时就会滚动。
</markdown>

<template>
    <McPopselect v-model:value="value" trigger="click" :options="options" :max-height="250">
        <McButton type="success" ghost>{{ value }}</McButton>
    </McPopselect>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McPopselect, McButton } from 'meetcode-ui';

const value = ref('test12');

const options = ref(
    [...Array(20).keys()].map(e => ({
        label: `test${e + 1}`,
        value: `test${e + 1}`
    }))
);
</script>
