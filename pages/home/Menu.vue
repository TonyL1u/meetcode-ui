<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { NMenu } from 'naive-ui';
import { useTitle } from '@vueuse/core';
import { onRoutePathChange, useMenu } from '../utils';
import { useSiteLanguage } from '../site.config';

// 初始化路由
const router = useRouter();
const { siteLanguage } = useSiteLanguage();
const { menus } = useMenu();
console.log(menus);
const activeKey = ref<string>('');
activeKey.value = window.location.pathname.split('/meetcode-ui')[1];

onRoutePathChange(path => {
    const splitKey = path.split('/');
    const title = decodeURI(splitKey[splitKey.length - 1]);
    useTitle(`McUI Docs | ${title}`);
    activeKey.value = path;
});

const handleUpdateValue = (key: string): void => {
    router.push(key === '' ? '/' : `/${siteLanguage.value}/${key}`);
};
</script>

<template>
    <NMenu v-model:value="activeKey" @update:value="handleUpdateValue" :options="menus" accordion />
</template>
