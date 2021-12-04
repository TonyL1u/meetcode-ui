<template>
    <NSpace>
        <NButton type="primary" ghost @click="text">Text</NButton>
        <NButton type="primary" ghost @click="success">Success</NButton>
        <NButton type="primary" ghost @click="warning">Warning</NButton>
        <NButton type="primary" ghost @click="info">Info</NButton>
        <NButton type="primary" ghost @click="error">Error</NButton>
    </NSpace>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { NSpace, NButton } from 'naive-ui';
import { McMessage } from 'meetcode-ui';

const text = () => {
    const msg = McMessage.text({
        message: 'text'
    });
};

const success = () => {
    const msg = McMessage.success({
        message: 'success'
    });
    console.log(msg);
};

const warning = () => {
    const msg = McMessage.warning({
        message: 'warning'
    });
    console.log(msg);
};

const info = () => {
    const msg = McMessage.info({
        message: 'info'
    });
    console.log(msg);
};

const error = () => {
    const msg = McMessage.error({
        message: 'error'
    });
    console.log(msg);
};
</script>
