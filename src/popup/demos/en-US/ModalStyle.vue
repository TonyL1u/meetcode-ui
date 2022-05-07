<template>
    <McButton type="success" ghost @click="handleClick">Open</McButton>
</template>

<script lang="ts" setup>
import { McPopup, McButton } from 'meetcode-ui';
import Test from './Test1.vue';

const instance = McPopup(Test);
const handleClick = () => {
    instance.show({
        title: 'This is a modal title',
        animation: 'slide',
        slots: {
            footer() {
                return 'ok!';
            }
        }
    });
};
</script>
