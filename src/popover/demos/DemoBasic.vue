<template>
    <NSpace>
        <McPopover title="标题" trigger="hover" content="这是测试内容">
            <NButton type="primary" ghost>悬浮</NButton>
        </McPopover>

        <McPopover title="标题" trigger="click">
            <NButton type="primary" ghost>点击</NButton>
            <template #content>这是测试内容</template>
        </McPopover>

        <McPopover title="标题" trigger="manual" :show="show">
            <NButton type="primary" ghost @click="show = !show">手动</NButton>
            <template #content>这是测试内容</template>
        </McPopover>
    </NSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NButton, NSpace } from 'naive-ui';
import { McPopover } from 'meetcode-ui';

const show = ref(false);
</script>
