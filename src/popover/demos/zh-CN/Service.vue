<template>
    <McButton ref="triggerBtn" @click="handleClick">Test</McButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McButton, ButtonExposeInstance } from 'meetcode-ui';
import { McPopoverService } from '../../PopoverService';

const triggerBtn = ref<ButtonExposeInstance>();
const handleClick = () => {
    console.log(triggerBtn.value?.el);
    const el = triggerBtn.value?.el;
    if (el) {
        McPopoverService(el);
    }
};
</script>
