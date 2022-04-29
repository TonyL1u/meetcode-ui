<template>
    <McButton type="success" ghost @click="handleClick">打开</McButton>
</template>

<script lang="ts" setup>
import { McPopup, McButton } from 'meetcode-ui';
import Test from './Test1.vue';

const instance = McPopup(Test);
const handleClick = () => {
    instance.show({
        title: '弹窗标题',
        showFooter: false
    });
};
</script>
