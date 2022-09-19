<template>
    <McSpace>
        <McButton type="success" ghost @click="show1 = true">Esc</McButton>
        <McButton type="success" ghost @click="show2 = true">Shift+A</McButton>
    </McSpace>

    <McModal v-model:show="show1" title="模态框">按下 Esc 关闭</McModal>
    <McModal v-model:show="show2" title="模态框" shortcut-key="Shift+A">同时按下 Shift 和 A 关闭</McModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McModal, McButton, McSpace } from 'meetcode-ui';

const show1 = ref(false);
const show2 = ref(false);
</script>
