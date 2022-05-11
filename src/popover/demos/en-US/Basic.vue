<template>
    <McSpace>
        <McPopover title="Title" trigger="hover" content="This is test content">
            <McButton type="success" ghost>Hover</McButton>
        </McPopover>

        <McPopover title="Title" trigger="click">
            <McButton type="success" ghost>Click</McButton>
            <template #content>This is test content</template>
        </McPopover>

        <McPopover title="Title" trigger="manual" :show="show">
            <McButton type="success" ghost @click="show = !show">Manual</McButton>
            <template #content>This is test content</template>
        </McPopover>

        <McPopover title="Title" trigger="manual" :show="show" :x="200" :y="200">
            <McButton type="success" ghost @click="show = !show">Manual with Explicit Control</McButton>
            <template #content>This is test content</template>
        </McPopover>
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McButton, McSpace, McPopover } from 'meetcode-ui';

const show = ref(false);
</script>
