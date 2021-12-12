<template>
    <NSpace>
        <McPopover @show="handleShow">
            <NButton type="primary" ghost>捕获显示事件</NButton>
            <template #content>这是测试内容</template>
        </McPopover>

        <McPopover @hide="handleHide">
            <NButton type="primary" ghost>捕获隐藏事件</NButton>
            <template #content>这是测试内容</template>
        </McPopover>

        <McPopover trigger="click" @update:show="handleUpdateShow">
            <NButton type="primary" ghost>一起捕获</NButton>
            <template #content>这是测试内容</template>
        </McPopover>
    </NSpace>
</template>

<script lang="ts" setup>
import { NButton, NSpace } from 'naive-ui';
import { McPopover, McMessage } from 'meetcode-ui';

const handleShow = (val: boolean) => {
    McMessage.text('Popover Show');
};
const handleHide = (val: boolean) => {
    McMessage.warning('Popover Hide');
};
const handleUpdateShow = (val: boolean) => {
    McMessage({
        type: val ? 'success' : 'error',
        message: val ? 'Popover Show' : 'Popover Hide'
    });
};
</script>
