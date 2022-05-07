<script lang="ts" setup>
import { ref } from 'vue';
import { NMenu } from 'naive-ui';
import { useRouter } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { useI18nController } from 'meetcode-ui';
import { onRoutePathChange, useMenu } from '../utils';

// 初始化路由
const router = useRouter();
const { current } = useI18nController();
const { menus } = useMenu();
const activeKey = ref<string>('');
activeKey.value = window.location.pathname.split('/meetcode-ui')[1];

onRoutePathChange(path => {
    const splitKey = path.split('/');
    const title = decodeURI(splitKey[splitKey.length - 1]);
    useTitle(`McUI Docs | ${title}`);
    activeKey.value = title;
});

const handleUpdateValue = (key: string): void => {
    router.push(key === '' ? '/' : `/${current.value}/${key}`);
};
</script>

<template>
    <NMenu v-model:value="activeKey" @update:value="handleUpdateValue" :options="menus" accordion />
</template>
