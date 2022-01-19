<template>
    <McSpace>
        <McButton type="success" ghost @click="text">文本</McButton>
        <McButton type="success" ghost @click="success">成功</McButton>
        <McButton type="success" ghost @click="warning">警告</McButton>
        <McButton type="success" ghost @click="info">信息</McButton>
        <McButton type="success" ghost @click="error">错误</McButton>
        <McButton type="success" ghost @click="loading">加载</McButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { McMessage, McSpace, McButton } from 'meetcode-ui';

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
