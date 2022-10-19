<template>
    <McSpace>
        <McButton type="success" ghost @click="config.max!--">-1</McButton>
        <McButton type="success" ghost @click="McMessage.text('这是一个文本 Message')">最多同时显示 {{ config.max }} 个信息</McButton>
        <McButton type="success" ghost @click="config.max!++">+1</McButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useMessage, McButton, McSpace } from 'meetcode-ui';
import type { MessageGlobalConfig } from 'meetcode-ui';

const config = reactive<MessageGlobalConfig>({ max: 4 });
const { McMessage } = useMessage(config);
</script>
