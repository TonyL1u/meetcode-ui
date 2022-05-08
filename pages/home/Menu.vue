<script lang="ts" setup>
import { ref } from 'vue';
import { NMenu } from 'naive-ui';
import { useRouter } from 'vue-router';
import { onRouterReady } from '../utils';
import type { MenuOption } from 'naive-ui';

const props = defineProps<{ menus: MenuOption[] }>();

// 初始化路由
const router = useRouter();
const activeKey = ref<string>('');
const handleUpdateValue = (key: string): void => {
    router.push(key === '' ? '/' : key);
};

onRouterReady((router, route) => {
    activeKey.value = route.path;
});
</script>

<template>
    <NMenu v-model:value="activeKey" @update:value="handleUpdateValue" :options="props.menus" accordion />
</template>
