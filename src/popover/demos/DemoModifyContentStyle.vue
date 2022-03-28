<template>
    <McPopover class="mc-bg-red-500" style="font-size: 20px; padding: 0" trigger="click" :with-arrow="false" match-trigger>
        <McButton type="success" ghost>点击点击点击点击点击</McButton>
        <template #content>这是测试内容</template>
    </McPopover>
</template>

<script lang="ts" setup>
import { McPopover, McButton } from 'meetcode-ui';
</script>
