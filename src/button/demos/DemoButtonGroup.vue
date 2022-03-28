<template>
    <McSpace>
        <McButtonGroup :size="size" vertical>
            <McButton @click="handleClick('mini')">Mini</McButton>
            <McButton @click="handleClick('small')">Small</McButton>
            <McButton @click="handleClick('medium')">Medium</McButton>
            <McButton @click="handleClick('large')">Large</McButton>
        </McButtonGroup>

        <McButtonGroup :size="size">
            <McButton @click="handleClick('mini')" round>Mini</McButton>
            <McButton @click="handleClick('small')">Small</McButton>
            <McButton @click="handleClick('medium')">Medium</McButton>
            <McButton @click="handleClick('large')" round>Large</McButton>
        </McButtonGroup>
    </McSpace>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { McButtonGroup, McButton, ButtonSize, McSpace } from 'meetcode-ui';

const size = ref<ButtonSize>('medium');
const handleClick = (value: ButtonSize) => {
    size.value = value;
};
</script>
