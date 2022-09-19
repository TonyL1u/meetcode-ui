<template>
    <McButton type="success" ghost @click="show = true">Open</McButton>

    <McModal v-model:show="show" title="Modal" :position="{ top: '15vh', left: 150 }">Something...</McModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McModal, McButton } from 'meetcode-ui';

const show = ref(false);
</script>
