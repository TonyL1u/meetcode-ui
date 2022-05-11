<template>
    <McSpace>
        <McPopover>
            <McButton type="success" ghost>Normal</McButton>
            <template #content>This is test content</template>
        </McPopover>
        <McPopover :offset="{ bottom: '12px', left: '24px' }">
            <McButton type="success" ghost>Offset</McButton>
            <template #content>This is test content</template>
        </McPopover>
    </McSpace>
</template>

<script lang="ts" setup>
import { McPopover, McSpace, McButton } from 'meetcode-ui';
</script>
