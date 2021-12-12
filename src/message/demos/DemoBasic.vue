<template>
    <NSpace>
        <NButton type="primary" ghost @click="text">文本</NButton>
        <NButton type="primary" ghost @click="success">成功</NButton>
        <NButton type="primary" ghost @click="warning">警告</NButton>
        <NButton type="primary" ghost @click="info">信息</NButton>
        <NButton type="primary" ghost @click="error">错误</NButton>
        <NButton type="primary" ghost @click="loading">加载</NButton>
    </NSpace>
</template>

<script lang="ts" setup>
import { NSpace, NButton } from 'naive-ui';
import { McMessage } from 'meetcode-ui';

const text = () => {
    McMessage.text('这是一个文本 Message');
};

const success = () => {
    McMessage.success('这是一个成功 Message');
};

const warning = () => {
    McMessage.warning('这是一个警告 Message');
};

const info = () => {
    McMessage.info('这是一个信息 Message');
};

const error = () => {
    McMessage.error('这是一个错误 Message');
};

const loading = () => {
    McMessage.loading('这是一个加载 Message');
};
</script>
