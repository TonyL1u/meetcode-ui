<template>
    <McButton type="success" ghost @click="handleClick">Appear From Cursor</McButton>
</template>

<script lang="ts" setup>
import { McPopup, McButton } from 'meetcode-ui';
import Test from './Test1.vue';

const handleClick = (event: MouseEvent) => {
    const { pageX, pageY } = event;
    const instance = McPopup(Test);
    instance.show({
        appearX: pageX,
        appearY: pageY,
        appearFromCursor: true
    });
};
</script>
