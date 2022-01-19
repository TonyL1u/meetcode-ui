<template>
    <McSpace>
        <McPopover>
            <McButton type="success" ghost>正常</McButton>
            <template #content>这是测试内容</template>
        </McPopover>
        <McPopover :offset="{ bottom: '12px', left: '24px' }">
            <McButton type="success" ghost>偏移</McButton>
            <template #content>这是测试内容</template>
        </McPopover>
    </McSpace>
</template>

<script lang="ts" setup>
import { McPopover, McSpace, McButton } from 'meetcode-ui';
</script>
