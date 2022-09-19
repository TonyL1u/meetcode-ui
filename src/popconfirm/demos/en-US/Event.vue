<template>
    <McPopconfirm content="这是一段内容确定删除吗？" :confirm-text="countDown ? `${countDown}秒后关闭` : '确定'" :confirm-disabled="!!countDown" @cancel="handleCancel" @confirm="handleConfirm">
        <McButton type="success" ghost>点击</McButton>
    </McPopconfirm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McButton, McPopconfirm, McMessage, McAsyncMessage } from 'meetcode-ui';

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
