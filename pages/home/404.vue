<template>
    <NResult status="404" title="404 资源不存在" description="生活总归带点荒谬" style="margin-top: 50px">
        <template #footer>
            <NButton @click="handleClick">找点乐子吧</NButton>
        </template>
    </NResult>
</template>

<script lang="ts" setup>
import { NButton, NResult } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const handleClick = (): void => {
    router.push('/');
};
</script>
