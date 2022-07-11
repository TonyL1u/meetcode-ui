<template>
    <McButton ref="reference" @click="handleClick">Test</McButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McButton, ButtonExposeInstance } from 'meetcode-ui';
import { McPopoverService } from '../../PopoverService';

const reference = ref<ButtonExposeInstance>();
const handleClick = () => {
    McPopoverService(reference.value.$.vnode);
};
</script>
