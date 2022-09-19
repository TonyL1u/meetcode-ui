<template>
    <McSpace>
        <McPopover trigger="click" :show-delay="1000">
            <McButton type="success" ghost>Click to delay the display by 1s</McButton>
            <template #content>This is test content</template>
        </McPopover>

        <McPopover :hide-delay="1000">
            <McButton type="success" ghost>Hover to delay the hide by 1s</McButton>
            <template #content>This is test content</template>
        </McPopover>
    </McSpace>
</template>

<script lang="ts" setup>
import { McPopover, McSpace, McButton } from 'meetcode-ui';
</script>
