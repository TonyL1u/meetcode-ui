<template>
    <McSpace>
        <McButton type="success" ghost @click="show1 = true">Animation 1</McButton>
        <McButton type="success" ghost @click="show2 = true">Animation 2</McButton>
        <McButton type="success" ghost @click="show3 = true">Animation 3</McButton>
    </McSpace>

    <McModal v-model:show="show1" title="Modal">Something...</McModal>
    <McModal v-model:show="show2" title="Modal" :appear-from-cursor="false">Something...</McModal>
    <McModal v-model:show="show3" title="Modal" :appear-from-cursor="false" animation="slide">Something...</McModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McModal, McButton, McSpace } from 'meetcode-ui';

const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
</script>
