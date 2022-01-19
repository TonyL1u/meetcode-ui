<template>
    <McSpace>
        <McPopover @show="handleShow">
            <McButton type="success" ghost>显示</McButton>
            <template #content>这是测试内容</template>
        </McPopover>

        <McPopover @hide="handleHide">
            <McButton type="success" ghost>隐藏</McButton>
            <template #content>这是测试内容</template>
        </McPopover>

        <McPopover trigger="click" @update:show="handleUpdateShow">
            <McButton type="success" ghost>显示 & 隐藏</McButton>
            <template #content>这是测试内容</template>
        </McPopover>
    </McSpace>
</template>

<script lang="ts" setup>
import { McPopover, McMessage, McSpace, McButton } from 'meetcode-ui';

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
