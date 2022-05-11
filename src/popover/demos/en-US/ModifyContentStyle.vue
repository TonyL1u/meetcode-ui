<template>
    <McPopover style="font-size: 20px; padding: 0; background: #ef4444" trigger="click" :with-arrow="false" match-trigger>
        <McButton type="success" ghost>Please Clickkkkkkk Me</McButton>
        <template #content>This is test content</template>
    </McPopover>
</template>

<script lang="ts" setup>
import { McPopover, McButton } from 'meetcode-ui';
</script>
