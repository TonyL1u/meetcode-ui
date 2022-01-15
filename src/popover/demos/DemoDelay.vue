<template>
    <McSpace>
        <McPopover trigger="click" :show-delay="1000">
            <NButton type="primary" ghost>点击，延迟1s显示</NButton>
            <template #content>这是测试内容</template>
        </McPopover>

        <McPopover :hide-delay="1000">
            <NButton type="primary" ghost>悬浮，延迟1s隐藏</NButton>
            <template #content>这是测试内容</template>
        </McPopover>
    </McSpace>
</template>
<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { McPopover, McSpace } from 'meetcode-ui';
</script>
