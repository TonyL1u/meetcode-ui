<template>
    <McPopover class="mc-bg-red-500" style="font-size: 20px; padding: 0" trigger="click" :with-arrow="false" match-trigger>
        <NButton type="primary" ghost>点击点击点击点击点击</NButton>
        <template #content>这是测试内容</template>
    </McPopover>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { McPopover } from 'meetcode-ui';
</script>
