<template>
    <McSpace>
        <McButton type="success" ghost @click="show1 = true">动画1</McButton>
        <McButton type="success" ghost @click="show2 = true">动画2</McButton>
        <McButton type="success" ghost @click="show3 = true">动画3</McButton>
    </McSpace>

    <McModal v-model:show="show1" title="模态框">内容</McModal>
    <McModal v-model:show="show2" title="模态框" :appear-from-cursor="false">内容</McModal>
    <McModal v-model:show="show3" title="模态框" :appear-from-cursor="false" animation="slide">内容</McModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McModal, McButton, McSpace } from 'meetcode-ui';

const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
</script>
