<template>
    <McButton type="success" ghost @click="show = true">打开</McButton>

    <McDrawer v-model:show="show" title="抽屉">
        <McButton type="success" ghost @click="show2 = true">打开</McButton>
    </McDrawer>

    <McModal v-model:show="show2" title="模态框">内容</McModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McDrawer, McModal, McButton } from 'meetcode-ui';

const show = ref(false);
const show2 = ref(false);
</script>
