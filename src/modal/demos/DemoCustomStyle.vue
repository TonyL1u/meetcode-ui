<template>
    <McSpace>
        <McButton type="success" ghost @click="show1 = true">默认</McButton>
        <McButton type="success" ghost @click="show2 = true">无 Header</McButton>
        <McButton type="success" ghost @click="show3 = true">无 Footer</McButton>
        <McButton type="success" ghost @click="show4 = true">无样式</McButton>
    </McSpace>

    <McModal v-model:show="show1" title="模态框">内容</McModal>
    <McModal v-model:show="show2" :show-header="false" cancel-text="哒咩" confirm-text="好">内容</McModal>
    <McModal v-model:show="show3" title="请确认" :width="300" :show-footer="false">内容</McModal>
    <McModal v-model:show="show4" :height="400" pure>内容</McModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McModal, McButton, McSpace } from 'meetcode-ui';

const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);
</script>
