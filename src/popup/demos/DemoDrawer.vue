<template>
    <McButton type="success" ghost @click="handleClick">打开一个抽屉</McButton>
</template>

<script lang="ts" setup>
import { McPopup, McButton } from 'meetcode-ui';
import Test from './Test1.vue';

const handleClick = () => {
    const instance = McPopup(Test);
    instance.show('drawer', {
        title: '抽屉'
    });
};
</script>
