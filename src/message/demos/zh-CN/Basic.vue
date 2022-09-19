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
