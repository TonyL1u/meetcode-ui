<template>
    <McButton @click="handleClick">测试</McButton>
</template>

<script lang="ts" setup>
import { McPopup, McButton } from 'meetcode-ui';
import Test from './Test.vue';

const handleClick = () => {
    McPopup(Test, {
        props: {
            title: '测试'
        },
        modalProps: {
            title: '测试'
        },
        on: {}
    });
    // console.log(instance.value?.el);
};
</script>
