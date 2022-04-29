<template>
    <McButton type="success" ghost @click="handleClick">打开</McButton>

    <McModal ref="modalInst" v-model:show="show" title="模态框">内容</McModal>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import { McModal, McButton, ModalExposeInstance } from 'meetcode-ui';

const modalInst = ref<ModalExposeInstance>();
const show = ref(false);

const handleClick = () => {
    show.value = true;
    console.log(modalInst.value);
    setTimeout(() => {
        modalInst.value?.hide();
    }, 2000);
};
</script>
