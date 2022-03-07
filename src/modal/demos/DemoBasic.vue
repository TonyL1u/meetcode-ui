<template>
    <McButton @click="show1 = true">测试</McButton>

    <McModal v-model:show="show1" title="模态框" :position="{ top: 150 }" @before-enter="handleBeforeEnter" @before-leave="handleBeforeLeave" @confirm="handleConfirm">
        <div><McButton @click="show2 = true">测试</McButton></div>
    </McModal>

    <McModal v-model:show="show2" height="800px">
        <div><McButton @click="show3 = true">测试</McButton></div>
    </McModal>

    <McModal v-model:show="show3" width="800px" height="400px">
        <div>再内层</div>
        <template #footer>123</template>
    </McModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McModal, McButton, ModalCloseAction } from 'meetcode-ui';

const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const handleBeforeEnter = () => {
    console.log('before enter');
};
const handleBeforeLeave = (action: ModalCloseAction) => {
    console.log('before leave');
    console.log(action);
    if (action === 'wrapper') {
        show2.value = true;
        return true;
    }
};
const handleConfirm = () => {
    console.log(12345);
};
const handleMaskClick = (e: MouseEvent) => {
    console.log(e);
};
const handleUpdateShow = (val: boolean) => {
    console.log(val);
};
const handleShortcut = () => {
    console.log(1);
};
const handleAfterEnter = () => {
    console.log('after enter');
};
const handleAfterLeave = () => {
    console.log('after leave');
};
</script>
