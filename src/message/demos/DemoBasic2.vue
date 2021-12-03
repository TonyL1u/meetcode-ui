<template>
    <button @click="addMsg">点击2</button>
</template>

<script lang="ts" setup>
import { MessageApi } from 'meetcode-ui';

const addMsg = () => {
    const msg = MessageApi.success();
    console.log(msg);
};
</script>
