<template>
    <McButton type="success" ghost @click="show1 = true">打开</McButton>

    <McDrawer v-model:show="show1" :size="600" title="抽屉">
        <McButton type="success" ghost @click="show2 = true">再打开</McButton>
    </McDrawer>

    <McDrawer v-model:show="show2" :size="300" title="另一个抽屉">
        <McButton type="success" ghost @click="show3 = true">再再打开</McButton>
    </McDrawer>

    <McModal v-model:show="show3" title="模态框">内容</McModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McDrawer, McModal, McButton, McSpace } from 'meetcode-ui';

const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
</script>
