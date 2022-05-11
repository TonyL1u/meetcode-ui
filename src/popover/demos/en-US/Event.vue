<template>
    <McSpace>
        <McPopover @show="handleShow">
            <McButton type="success" ghost>Show</McButton>
            <template #content>This is test content</template>
        </McPopover>

        <McPopover @hide="handleHide">
            <McButton type="success" ghost>Hide</McButton>
            <template #content>This is test content</template>
        </McPopover>

        <McPopover trigger="click" @update:show="handleUpdateShow">
            <McButton type="success" ghost>Show & Hide</McButton>
            <template #content>This is test content</template>
        </McPopover>
    </McSpace>
</template>

<script lang="ts" setup>
import { McPopover, McMessage, McSpace, McButton } from 'meetcode-ui';

const handleShow = (val: boolean) => {
    McMessage.text('Popover Show');
};
const handleHide = (val: boolean) => {
    McMessage.warning('Popover Hide');
};
const handleUpdateShow = (val: boolean) => {
    McMessage({
        type: val ? 'success' : 'error',
        message: val ? 'Popover Show' : 'Popover Hide'
    });
};
</script>
