<markdown>
### 无边框
</markdown>

<template>
    <McInput v-model:value="value" borderless />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McInput } from 'meetcode-ui';

const value = ref('');
</script>
