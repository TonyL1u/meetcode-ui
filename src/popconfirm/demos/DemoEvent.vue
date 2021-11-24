<template>
    <McPopconfirm content="这是一段内容确定删除吗？" :confirm-text="countDown ? `${countDown}秒后关闭` : '确认'" :confirm-disabled="!!countDown" @cancel="handleCancel" @confirm="handleConfirm">
        <NButton type="primary" ghost>点击</NButton>
    </McPopconfirm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { McPopconfirm } from 'meetcode-ui';

const countDown = ref(0);
const sleep = (wait: number) => {
    if (wait <= 0) return;

    countDown.value = wait;
    return new Promise<void>(resolve => {
        const timer = setInterval(async () => {
            if (--countDown.value === 0) {
                clearInterval(timer);
                resolve();
            }
        }, 1000);
    });
};

const handleCancel = () => {
    console.log('Cancel Clicked');
    return true;
};
const handleConfirm = async () => {
    console.log('Confirm Clicked');
    await sleep(3);
};
</script>
