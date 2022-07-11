<template>
    <McButton type="success" ghost @click="show()">打开</McButton>
</template>

<script lang="ts" setup>
import { McPopup, McButton } from 'meetcode-ui';
import Test from './Test3.vue';
import router from '@pages/router';

const { show } = McPopup(Test, {
    // 传入需要使用的插件
    plugins: [router],
    autoDestroy: false
});
</script>
