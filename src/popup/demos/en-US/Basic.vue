<template>
    <McSpace>
        <McButton type="success" ghost @click="createWithVue">Vue</McButton>
        <McButton type="success" ghost @click="createWithVNode">VNode</McButton>
        <McButton type="success" ghost @click="createWithHTML">HTML</McButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { createVNode } from 'vue';
import { McPopup, McButton, McSpace } from 'meetcode-ui';
import Test from './Test1.vue';

const createWithVue = () => {
    const instance = McPopup(Test);
    instance.show();
};
const createWithVNode = () => {
    const instance = McPopup(createVNode('div', null, 'Created by VNode'));
    instance.show();
};
const createWithHTML = () => {
    const instance = McPopup('Created by <i>HTML</i>');
    instance.show();
};
</script>
