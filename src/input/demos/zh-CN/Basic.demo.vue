<markdown>
### 基础用法

最简单的 `Input` 框用法。
</markdown>

<template>
    <McInput v-model:value="value" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McInput } from 'meetcode-ui';

const value = ref('');
</script>
