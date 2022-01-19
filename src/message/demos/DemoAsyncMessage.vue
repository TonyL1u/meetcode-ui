<template>
    <McButton type="success" ghost @click="open">打开</McButton>
</template>

<script lang="ts" setup>
import { createVNode } from 'vue';
import { McAsyncMessage, McMessage, McButton, McIcon } from 'meetcode-ui';
import { HourglassOutline as IconHourglass } from '@vicons/ionicons5';

const open = async () => {
    await McAsyncMessage({
        message: '加载中...',
        icon: () => createVNode(McIcon, { style: 'margin-right: 6px', color: '#f59e0b' }, { default: () => createVNode(IconHourglass) }),
        card: true
    });

    await McAsyncMessage.error('加载失败！正在重试...', {
        card: true
    });

    McMessage.success('成功！', {
        card: true
    });
};
</script>
