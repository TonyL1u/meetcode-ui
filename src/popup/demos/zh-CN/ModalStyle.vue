<template>
    <McButton type="success" ghost @click="handleClick">打开</McButton>
</template>

<script lang="ts" setup>
import { McPopup, McButton } from 'meetcode-ui';
import Test from './Test1.vue';

const instance = McPopup(Test, { autoDestroy: false });
const handleClick = () => {
    instance.show({
        title: '弹窗标题',
        animation: 'slide',
        slots: {
            footer() {
                return '好！';
            }
        }
    });
};
</script>
