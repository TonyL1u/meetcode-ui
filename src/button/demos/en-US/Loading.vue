<template>
    <McButton ghost :loading="loading" :disabled="loading" @click="handleClick">{{ loading ? 'Loading...' : 'Click Me' }}</McButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McButton, McAsyncMessage } from 'meetcode-ui';

const loading = ref(false);
const handleClick = async () => {
    loading.value = true;
    await McAsyncMessage.loading('Loading...');
    loading.value = false;
};
</script>
