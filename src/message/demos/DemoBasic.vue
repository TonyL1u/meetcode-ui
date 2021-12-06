<template>
    <!-- <NSpace>
        <NButton type="primary" ghost @click="text">Text</NButton>
        <NButton type="primary" ghost @click="success">Success</NButton>
        <NButton type="primary" ghost @click="warning">Warning</NButton>
        <NButton type="primary" ghost @click="info">Info</NButton>
        <NButton type="primary" ghost @click="error">Error</NButton>
    </NSpace>

    <button @click="handleClick">++</button>
    <button @click="handleChange">++2222</button> -->
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { NSpace, NButton } from 'naive-ui';
// import { McMessage, MessageOptions } from 'meetcode-ui';

// let msg = null;
// let msg2 = null;
// const countRef = ref(0);
// const options = reactive({
//     message: 'text',
//     duration: 0,
//     closable: true
// });
// const options2 = reactive<MessageOptions>({
//     type: 'text',
//     message: 'text',
//     duration: 0,
//     closable: true
// });
// const handleClick = () => {
//     countRef.value++;
//     msg.options.message = '' + countRef.value;
//     msg.type = 'error';
//     msg.close();
// };
// const handleChange = () => {
//     options.message = '123456';
//     options2.message = '1111';
//     options2.type = 'error';
// };
// const text = () => {
//     msg = McMessage.text(options);
//     // msg2 = McMessage(options2);
// };

// const success = () => {
//     const msg = McMessage.success({
//         message: 'success'
//     });
//     console.log(msg);
// };

// const warning = () => {
//     const msg = McMessage.warning({
//         message: 'warning'
//     });
//     console.log(msg);
// };

// const info = () => {
//     const msg = McMessage.info({
//         message: 'info'
//     });
//     console.log(msg);
// };

// const error = () => {
//     const msg = McMessage.error({
//         message: 'error'
//     });
//     console.log(msg);
// };
</script>
