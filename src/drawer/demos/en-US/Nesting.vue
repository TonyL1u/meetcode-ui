<template>
    <McButton type="success" ghost @click="show1 = true">Open</McButton>

    <McDrawer v-model:show="show1" :size="600" title="Drawer">
        <McButton type="success" ghost @click="show2 = true">Open Again</McButton>
    </McDrawer>

    <McDrawer v-model:show="show2" :size="300" title="Another Drawer">
        <McButton type="success" ghost @click="show3 = true">Open Again and Again</McButton>
    </McDrawer>

    <McModal v-model:show="show3" title="Modal">Something...</McModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McDrawer, McModal, McButton, McSpace } from 'meetcode-ui';

const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
</script>
