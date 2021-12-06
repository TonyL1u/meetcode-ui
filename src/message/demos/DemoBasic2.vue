<template>
    <button @click="handleClick">点击1</button>
    <button @click="handleClick2">点击2</button>
    <button @click="handleChange">改1</button>
    <button @click="handleChange2">改2</button>

    <n-button @click="createMessage"> 先开个信息 </n-button>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, render } from 'vue';
import { useMessage, NButton } from 'naive-ui';
import { McMessage } from 'meetcode-ui';

let msg;
let msg2;

const message = useMessage();
const types = ['success', 'info', 'warning', 'error', 'loading'];
const countRef = ref(0);
const typeIndexRef = ref(0);
let msgReactive = reactive({});
const content = ref('123');
const createMessage = () => {
    msgReactive = message.info(content.value, options);
};

const options = {
    type: 'info',
    message: 'test',
    content: 'test',
    duration: 0,
    closable: true
};
const options2 = reactive({
    message: 'text1111',
    duration: 0,
    closable: true
});
const handleClick = () => {
    msg = McMessage(options);
    console.log(msg);
};
const handleChange = () => {
    content.value = '345';
    // msgReactive.content = '345';
    // msg.type.value = 'error';
    // msg.options.message = '12345';
    // msg.type = 'error';
    // options.message = '12345';
    msg.message = '2345';
    // msg.close();
    console.log(options);
};

const handleClick2 = () => {
    msg2 = McMessage.text(content.value, options2);
    console.log(msg2);
};
const handleChange2 = () => {
    // console.log(msg);
    // msg.type = 'error';
    // msg.closable = true;
    // options.message = 'test2';
    // options.type = 'error';
    // options.message = 'test2';
    // msg.options.message = 'test2';
    // console.log(MessageInstanceList[0]);
    // msg2.message = 'test3';

    options2.message = 'test4';
    content.value = 'test3';
    msg2.close();
    console.log(options2);
};
</script>
