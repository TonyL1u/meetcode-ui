<template>
    <McSpace>
        <NButton type="primary" ghost @click="open">可关闭</NButton>
        <NButton type="primary" ghost @click="close">手动关闭</NButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { NSpace, NButton } from 'naive-ui';
import { McMessage, MessageApiInstance, McSpace } from 'meetcode-ui';

let messageInstance: MessageApiInstance<'success'> | null;

const open = () => {
    messageInstance = McMessage.success({
        message: '这个信息可以手动关闭',
        closable: true
    });
};

const close = () => {
    messageInstance?.close();
    messageInstance = null;
};
</script>
