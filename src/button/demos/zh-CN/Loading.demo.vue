<markdown>
### 加载中

设置 `loading = true` 为按钮添加加载状态。
</markdown>

<template>
    <McButton ghost :loading="loading" :disabled="loading" @click="handleClick">{{ loading ? '加载中...' : '点我加载' }}</McButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McButton, McAsyncMessage } from 'meetcode-ui';

const loading = ref(false);
const handleClick = async () => {
    loading.value = true;
    await McAsyncMessage.loading('加载中...');
    loading.value = false;
};
</script>
