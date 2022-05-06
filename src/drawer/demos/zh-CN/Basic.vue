<template>
    <McSpace>
        <McButton type="success" ghost @click="handleClick('top')">从上往下</McButton>
        <McButton type="success" ghost @click="handleClick('right')">从右往左</McButton>
        <McButton type="success" ghost @click="handleClick('bottom')">从下往上</McButton>
        <McButton type="success" ghost @click="handleClick('left')">从左往右</McButton>
    </McSpace>

    <McDrawer v-model:show="show" :appear-direction="direction" title="抽屉">内容</McDrawer>
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
