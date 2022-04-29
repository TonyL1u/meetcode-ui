<template>
    <McButton @click="handleClick">测试</McButton>
</template>

<script lang="ts" setup>
import { McPopup, McButton } from 'meetcode-ui';
import Test from './Test.vue';

interface Props {
    msg: string;
}

type Emit = {
    update: () => void;
};

const handleClick = () => {
    const { show, hide } = McPopup<Props, Emit>(Test, {
        props: {
            msg: 'hello world'
        },
        on: {
            update: () => {
                console.log('update');
                hide();
            }
        }
    });
    show({
        title: '123',
        showHeader: false,
        showFooter: false,
        shortcutKey: 'Shift+A'
    });
};
</script>
