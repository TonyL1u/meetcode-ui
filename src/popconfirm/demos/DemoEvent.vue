<template>
    <McPopconfirm content="这是一段内容确定删除吗？" @cancel="handleCancel" @confirm="handleConfirm">
        <NButton type="primary" ghost>点击</NButton>
    </McPopconfirm>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { McPopconfirm } from 'meetcode-ui';

const handleCancel = (cb: Function) => {
    console.log('Cancel Clicked');
    cb();
};
const handleConfirm = () => {
    console.log('Confirm Clicked');
};
</script>
