<template>
    <McSpace>
        <McButton type="success" ghost @click="open">可关闭</McButton>
        <McButton type="success" ghost @click="close">手动关闭</McButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { McMessage, MessageApiInstance, McSpace, McButton } from 'meetcode-ui';

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
