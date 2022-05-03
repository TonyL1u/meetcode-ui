<template>
    <McButton type="success" ghost @click="show()">打开</McButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McPopup, McButton } from 'meetcode-ui';
import Test from './Test2.vue';

interface TestProps {
    count: number;
    // 写成 reactiveCount: Ref<number> 也是完全合理并正确的
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
