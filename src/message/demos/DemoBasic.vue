<template>
    1
    <!-- <msg /> -->
    <button @click="addMsg">点击</button>
</template>

<script lang="ts" setup>
import { MessageApi, msg } from 'meetcode-ui';

console.log(MessageApi.success());
console.log(msg);

const addMsg = () => {
    MessageApi.success();
};
</script>
