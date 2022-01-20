<template>
    <McButtonGroup :size="size">
        <McButton @click="handleClick('mini')">Mini</McButton>
        <McButton @click="handleClick('small')">Small</McButton>
        <McButton @click="handleClick('medium')">Medium</McButton>
        <McButton @click="handleClick('large')">Large</McButton>
    </McButtonGroup>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { McButtonGroup, McButton, UISize } from 'meetcode-ui';

const size = ref<UISize>('medium');
const handleClick = (value: UISize) => {
    size.value = value;
};
</script>
