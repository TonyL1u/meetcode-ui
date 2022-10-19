<template>
    <McSpace>
        <McButton type="success" ghost @click="McMessage.text('这是一个文本 Message')">打开一个信息</McButton>
        <McButton type="success" ghost @click="MyMcMessage.success('这是一个成功 Message')">打开另一个信息</McButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { useMessage, McMessage, McButton, McSpace } from 'meetcode-ui';

const { McMessage: MyMcMessage } = useMessage();
</script>
