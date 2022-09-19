<template>
    <McButton type="success" ghost @click="show1 = true">延迟关闭</McButton>

    <McModal v-model:show="show1" title="模态框" :height="500" @before-leave="handleBeforeLeave">{{ countDown ? `${countDown} 秒后关闭` : '内容' }}</McModal>
    <McModal v-model:show="show2" title="请确认" :width="300" :appear-from-cursor="false" @confirm="show1 = false">是否关闭当前窗口？</McModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McModal, McButton, McMessage, ModalCloseAction } from 'meetcode-ui';

const countDown = ref(0);
const show1 = ref(false);
const show2 = ref(false);

const sleep = (ms: number) => {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

const handleBeforeLeave = async (action: ModalCloseAction) => {
    McMessage.text(action);
    if (countDown.value > 0) {
        return true;
    }

    if (action === 'wrapper' || action === 'shortcut') {
        show2.value = true;
        return true;
    } else if (action === 'cancel' || action === 'confirm') {
        countDown.value = 3;
        const timer = setInterval(() => {
            if (--countDown.value === 0) {
                clearInterval(timer);
            }
        }, 1000);
        await sleep(3000);
    }
};
</script>
