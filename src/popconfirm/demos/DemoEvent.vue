<template>
    <McPopconfirm content="这是一段内容确定删除吗？" :confirm-text="countDown ? `${countDown}秒后关闭` : '确认'" :confirm-disabled="!!countDown" @cancel="handleCancel" @confirm="handleConfirm">
        <NButton type="primary" ghost>点击</NButton>
    </McPopconfirm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { McPopconfirm, McMessage, McAsyncMessage } from 'meetcode-ui';

const countDown = ref(0);

const handleCancel = () => {
    McMessage.text('Cancel Clicked');
    return true;
};
const handleConfirm = async () => {
    countDown.value = 3;
    const timer = setInterval(() => {
        if (--countDown.value === 0) {
            clearInterval(timer);
        }
    }, 1000);
    await McAsyncMessage.warning('Confirm Clicked');
    McMessage.success('Popconfirm Closed');
};
</script>
