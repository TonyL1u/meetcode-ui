<template>
    <NMenu v-model:value="activeKey" @update:value="handleUpdateValue" :options="menuTree" accordion />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { NMenu } from 'naive-ui';
import { menuTree } from '../docs';
import { useTitle } from '@vueuse/core';

// 初始化路由
const router = useRouter();
const route = useRoute();
const activeKey = ref<null | string>('');
activeKey.value = window.location.pathname.split('/meetcode-ui')[1];

watch(
    () => route.path,
    (newPath, oldPath) => {
        const splitKey = newPath.split('/');
        const title = decodeURI(splitKey[splitKey.length - 1]);
        useTitle(`McUI Docs | ${title}`);
        activeKey.value = newPath;
    }
);

const handleUpdateValue = (key: string): void => {
    router.push(key === '' ? '/' : key);
};
</script>
