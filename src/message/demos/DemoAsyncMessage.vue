<template>
    <NButton type="primary" ghost @click="open">打开</NButton>
</template>

<script lang="ts" setup>
import { createVNode } from 'vue';
import { NButton, NIcon } from 'naive-ui';
import { McAsyncMessage, McMessage } from 'meetcode-ui';
import { HourglassOutline as IconHourglass } from '@vicons/ionicons5';

const open = async () => {
    await McAsyncMessage({
        message: '加载中...',
        icon: () => createVNode(NIcon, { style: 'margin-right: 6px', color: '#f59e0b' }, { default: () => createVNode(IconHourglass) }),
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
