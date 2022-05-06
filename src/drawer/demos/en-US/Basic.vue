<template>
    <McSpace>
        <McButton type="success" ghost @click="handleClick('top')">From Top to Bottom</McButton>
        <McButton type="success" ghost @click="handleClick('right')">From Right to Left</McButton>
        <McButton type="success" ghost @click="handleClick('bottom')">From Bottom to Top</McButton>
        <McButton type="success" ghost @click="handleClick('left')">From Left to Right</McButton>
    </McSpace>

    <McDrawer v-model:show="show" :appear-direction="direction" title="Drawer">Something...</McDrawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McDrawer, McButton, McSpace, DrawerAppearDirection } from 'meetcode-ui';

const show = ref(false);
const direction = ref<DrawerAppearDirection>();
const handleClick = (val: DrawerAppearDirection) => {
    direction.value = val;
    show.value = true;
};
</script>
