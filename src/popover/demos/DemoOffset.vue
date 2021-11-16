<template>
    <NSpace>
        <McPopover>
            <NButton type="primary" ghost>正常</NButton>
            <template #content>这是测试内容</template>
        </McPopover>
        <McPopover :offset="{ bottom: '12px', left: '24px' }">
            <NButton type="primary" ghost>偏移</NButton>
            <template #content>这是测试内容</template>
        </McPopover>
    </NSpace>
</template>

<script lang="ts" setup>
import { NButton, NSpace } from 'naive-ui';
import { McPopover } from 'meetcode-ui';
</script>
