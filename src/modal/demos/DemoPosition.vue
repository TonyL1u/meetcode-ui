<template>
    <McButton type="success" ghost @click="show = true">打开</McButton>

    <McModal v-model:show="show" title="模态框" :position="{ top: '15vh', left: 150 }">内容</McModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McModal, McButton } from 'meetcode-ui';

const show = ref(false);
</script>
