<template>
    <NSpace>
        <McPopover title="标题" trigger="hover">
            <NButton type="primary" ghost>悬浮</NButton>
            <template #content>这是测试内容</template>
        </McPopover>

        <McPopover title="标题" trigger="click" placement="bottom">
            <NButton type="primary" ghost>点击</NButton>
            <template #content>这是测试内容</template>
        </McPopover>

        <McPopover title="标题" trigger="manual" placement="right" :show="show">
            <NButton type="primary" ghost @click="show = !show">手动</NButton>
            <template #content>这是测试内容</template>
        </McPopover>
    </NSpace>
</template>

<script lang="ts" setup>
import { NButton, NSpace } from 'naive-ui';
import { McPopover } from 'meetcode-ui';
import { ref } from 'vue';

const show = ref(false);
</script>
