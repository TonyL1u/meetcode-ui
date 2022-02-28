<template>
    <McButton @click="handleClick">测试</McButton>
</template>

<script lang="ts" setup>
import { McPopup, McButton } from 'meetcode-ui';

const handleClick = () => {
    McPopup.show();
};
</script>
