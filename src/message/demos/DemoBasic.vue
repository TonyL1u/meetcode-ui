<template>
    <button @click="addMsg">点击1</button>
    <button @click="options.content++">点击++</button>
    <button @click="close">关闭</button>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { MessageApi } from 'meetcode-ui';

const options = reactive({ content: 1 });
let msg = null;
const addMsg = () => {
    msg = MessageApi.success(options);
    console.log(msg);
};

const close = () => {
    msg.close();
};
</script>
