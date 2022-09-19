<template>
    <McSpace>
        <McButton type="success" ghost @click="show1 = true">Default</McButton>
        <McButton type="success" ghost @click="show2 = true">No Header</McButton>
        <McButton type="success" ghost @click="show3 = true">No Footer</McButton>
        <McButton type="success" ghost @click="show4 = true">Empty</McButton>
    </McSpace>

    <McModal v-model:show="show1" title="Modal">Something...</McModal>
    <McModal v-model:show="show2" :show-header="false" cancel-text="哒咩" confirm-text="好">Something...</McModal>
    <McModal v-model:show="show3" title="Confirm" :width="300" :show-footer="false">Something...</McModal>
    <McModal v-model:show="show4" :height="400" pure>Something...</McModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McModal, McButton, McSpace } from 'meetcode-ui';

const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);
</script>
