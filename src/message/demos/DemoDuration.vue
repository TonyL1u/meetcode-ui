<template>
    <NSpace>
        <NButton type="primary" ghost @click="open1">10s 后关闭</NButton>
        <NButton type="primary" ghost @click="open2">不会关闭</NButton>
    </NSpace>
</template>

<script lang="ts" setup>
import { NSpace, NButton } from 'naive-ui';
import { McMessage } from 'meetcode-ui';

const open1 = () => {
    let countDown = 10;
    const messageInstance = McMessage.loading({
        message: '10s 后关闭',
        duration: 10000,
        card: true
    });
    const timer = setInterval(() => {
        messageInstance.message = `${--countDown}s 后关闭`;
        if (countDown === 0) {
            clearInterval(timer);
        }
    }, 1000);
};

const open2 = () => {
    McMessage.error('这个信息不会自动关闭', {
        duration: 0,
        closable: true,
        card: true
    });
};
</script>
