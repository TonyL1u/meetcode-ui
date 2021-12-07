<template>
    <button @click="handleClick">点击1</button>
    <button @click="handleClick2">点击2</button>
    <button @click="handleChange">改1</button>
    <button @click="handleChange2">改2</button>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, render } from 'vue';
import { McMessage, MessageInstance, MessageApiInstance, MessageType, McAsyncMessage } from 'meetcode-ui';

let msg: MessageInstance;
let msg2: MessageApiInstance<MessageType> | null;
const handleClick = () => {
    msg = McMessage({
        type: 'text',
        message: '测试',
        duration: 0,
        closable: true
    });
    console.log(msg);
};
const handleChange = () => {
    msg.type = 'success';
    msg.message = '2345';
};
const options = reactive({
    message: '123',
    closable: true,
    onClose() {
        console.log(1);
    }
});

const handleClick2 = async () => {
    await McAsyncMessage.text(options);
    McAsyncMessage.success('测试', {
        duration: 0,
        closable: true
    });
    // McMessage.warning('测试', {
    //     duration: 0,
    //     closable: true
    // });
    // McMessage.info('测试', {
    //     duration: 0,
    //     closable: true
    // });
    // McMessage.error('测试', {
    //     duration: 0,
    //     closable: true
    // });
    console.log(msg2);
};
const handleChange2 = () => {
    options.message = '345';
    // if (msg2?.close) {
    //     msg2.close();
    //     msg2 = null;
    // }
};
</script>
