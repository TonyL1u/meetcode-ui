<template>
    <McSpace vertical :item-style="{ width: '100%' }">
        <McButton dashed block>我是</McButton>
        <McButton type="primary" render="text" block>块级</McButton>
        <McButton type="success" render="link" block>按钮</McButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { McButton, McSpace } from 'meetcode-ui';
</script>
