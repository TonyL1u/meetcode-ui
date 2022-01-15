<template>
    <McSpace>
        <NButton type="primary" ghost @click="text">文本</NButton>
        <NButton type="primary" ghost @click="success">成功</NButton>
        <NButton type="primary" ghost @click="warning">警告</NButton>
        <NButton type="primary" ghost @click="info">信息</NButton>
        <NButton type="primary" ghost @click="error">错误</NButton>
        <NButton type="primary" ghost @click="loading">加载</NButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { NSpace, NButton } from 'naive-ui';
import { McMessage, McSpace } from 'meetcode-ui';

const text = () => {
    McMessage({
        type: 'text',
        message: '这是一个文本 Message',
        card: true
    });
};

const success = () => {
    McMessage({
        type: 'success',
        message: '这是一个成功 Message',
        card: true
    });
};

const warning = () => {
    McMessage({
        type: 'warning',
        message: '这是一个警告 Message',
        card: true
    });
};

const info = () => {
    McMessage({
        type: 'info',
        message: '这是一个信息 Message',
        card: true
    });
};

const error = () => {
    McMessage({
        type: 'error',
        message: '这是一个错误 Message',
        card: true
    });
};

const loading = () => {
    McMessage({
        type: 'loading',
        message: '这是一个加载 Message',
        card: true
    });
};
</script>
