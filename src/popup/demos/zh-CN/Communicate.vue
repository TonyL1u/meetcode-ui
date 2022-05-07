<template>
    <McButton type="success" ghost @click="show()">打开</McButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McPopup, McButton } from 'meetcode-ui';
import Test from './Test2.vue';

interface TestProps {
    count: number;
    // 这里写成 reactiveCount: Ref<number> 也OK，不会报类型错误！
    reactiveCount: number;
}
type TestEmits = {
    close: () => void;
    update: () => void;
};

const count = ref(0);
const { show, hide } = McPopup<TestProps, TestEmits>(Test, {
    props: { count: count.value, reactiveCount: count },
    on: {
        close() {
            hide();
            count.value = 0;
        },
        update() {
            count.value++;
        }
    }
});
</script>
