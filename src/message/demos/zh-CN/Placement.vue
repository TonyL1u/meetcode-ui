<template>
    <McButton type="success" ghost @click="McMessage.text('这是一个文本 Message')">从右上角出现</McButton>
</template>

<script lang="ts" setup>
import { useMessage, McButton } from 'meetcode-ui';

const { McMessage } = useMessage({ placement: 'top-right', card: true });
</script>
