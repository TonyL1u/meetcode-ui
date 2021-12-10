<template>
    <button @click="handleClick">点击1</button>
    <button @click="handleClick2">点击2</button>
    <button @click="handleChange">改1</button>
    <button @click="handleChange2">改2</button>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, render, nextTick } from 'vue';
import { McMessage, MessageInstance, MessageApiInstance, MessageType, McAsyncMessage } from 'meetcode-ui';

let msg: MessageInstance;
let msg2: MessageApiInstance<'text'> | null;
const sleep = (wait: number) =>
    new Promise<void>(resolve => {
        setTimeout(() => {
            resolve();
        }, wait);
    });
const handleClick = () => {
    msg = McMessage({
        type: 'text',
        message: '测试',
        duration: 0,
        closable: true,
        onClose() {
            // console.log(1234);
        }
    });

    nextTick(() => {
        console.log(msg);
    });
};
const handleChange = () => {
    console.log(msg);
    msg.type = 'success';
    msg.message = '2345';
};
const options = reactive({
    message: '1212312weqweqweqw123123',
    duration: 2000,
    closable: true,
    async onClose() {
        console.log('onClose call');
        await sleep(3000);
        console.log('async call');
    }
});

const handleClick2 = async () => {
    msg2 = McMessage.text(options);
    console.log('then call 1');
    await McAsyncMessage.success('测试', {
        duration: 2000,
        closable: true
    });
    // console.log('then call 2');
    // await McAsyncMessage.error('测试', {
    //     duration: 2000,
    //     closable: true
    // });
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
    // console.log(msg2);
};
const handleChange2 = () => {
    options.message = '345';
    msg2?.close();
    // if (msg2?.close) {
    //     msg2.close();
    //     msg2 = null;
    // }
};
</script>
