<template>
    <McSpace>
        <McButton type="success" ghost @click="show1 = true">打开1</McButton>
        <McButton type="success" ghost @click="show2 = true">打开2</McButton>
    </McSpace>

    <McModal v-model:show="show1" title="模态框" @wrapper-click="handleWrapperClick">内容</McModal>
    <McModal v-model:show="show2" title="模态框" :wrapper-closable="false" @wrapper-click="handleWrapperClick">内容</McModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McModal, McButton, McMessage, McSpace } from 'meetcode-ui';

const show1 = ref(false);
const show2 = ref(false);
const handleWrapperClick = () => {
    McMessage.text('Wrapper Click');
};
</script>
