<template>
    <McButton type="success" ghost @click="show()">打开</McButton>
</template>

<script lang="ts" setup>
import { McPopup, McButton } from 'meetcode-ui';
import Test from './Test2.vue';

interface TestProps {
    msg: string;
}

type TestEmit = {
    close: () => void;
};

const { show, hide } = McPopup<TestProps, TestEmit>(Test, {
    props: {
        msg: '点我关闭弹窗'
    },
    on: {
        close() {
            hide();
        }
    }
});
</script>
