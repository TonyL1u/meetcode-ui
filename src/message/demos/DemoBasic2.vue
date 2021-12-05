<template>
    <!-- <MessageContainerVue /> -->
    <button @click="handleClick">点击</button>
    <button @click="handleChange">改1</button>
    <button @click="handleChange2">改2</button>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, render } from 'vue';
// import { McMessage, MessageApiOptions } from 'meetcode-ui';
import MessageInstanceList, { McMessage } from '../MessageComposable';
// import MessageContainerVue from '../MessageContainer.vue';

let msg;
let msg2;
const options = reactive({
    type: 'info',
    message: 'test',
    duration: 0
});
const handleClick = () => {
    msg = McMessage({
        type: 'info',
        message: 'test',
        duration: 0
    });

    // msg.message = 'test666';
    // console.log(MessageInstanceList[0]);
    // msg.type = 'error';
    // msg.className = 'test-12';

    msg2 = McMessage.text('text', {
        duration: 0
    });
    // msg2.message = 'test5555';
    // setTimeout(() => {
    //     msg2.message = 'test5555';
    // }, 0);
    // McMessage.success('success', {
    //     duration: 0
    // });
    // McMessage.info('info', {
    //     duration: 0
    // });
    // McMessage.error('error', {
    //     duration: 0
    // });
    // McMessage.warning('warning', {
    //     duration: 0
    // });
};

const handleChange = () => {
    // console.log(MessageInstanceList[0]);
    // MessageInstanceList[0].type = 'success';
    // MessageInstanceList[0].options.message = 'test1';
};
const handleChange2 = () => {
    // console.log(msg);
    // msg.type = 'error';
    msg.message = 'test2';
    // options.type = 'error';
    // options.message = 'test2';
    // msg.options.message = 'test2';
    // console.log(MessageInstanceList[0]);
    msg2.meessage = 'test3';
};
</script>
