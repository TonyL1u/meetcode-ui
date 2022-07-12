<template>
    <McButton type="success" ghost @click="show()">使用了 vue-router</McButton>
</template>

<script lang="ts" setup>
import { McPopup, McButton } from 'meetcode-ui';
import Test from './Test3.vue';
// 这里引入在 main.ts 中通过 use() 方法注册的插件
import router from '@pages/router';

const { show } = McPopup(Test, {
    // 2. 手动传入需要使用的插件
    plugins: [router],
    autoDestroy: false
});
</script>
