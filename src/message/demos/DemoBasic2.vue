<template>
    <button @click="addMsg">点击2</button>
    <button @click="options.message = '1234567'">++</button>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import { McMessage, MessageApiOptions } from 'meetcode-ui';

const options = reactive<MessageApiOptions>({
    message: '这是一条提示信息',
    className: 'my-message',
    style: {
        background: 'red'
    }
});
const addMsg = () => {
    const msg = McMessage.success(options);
    McMessage({
        type: 'success',
        ...options
    });
    msg.options.message = 'bbbbb';
    console.log(msg);
};
</script>
