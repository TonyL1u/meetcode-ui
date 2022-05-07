<template>
    <McButton type="success" ghost @click="show()">Open</McButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McPopup, McButton } from 'meetcode-ui';
import Test from './Test2.vue';

interface TestProps {
    count: number;
    // reactiveCount: Ref<number> is ok too!
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
