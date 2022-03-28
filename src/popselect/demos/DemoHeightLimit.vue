<template>
    <McPopselect v-model:value="value" :options="options" :max-height="250">
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
