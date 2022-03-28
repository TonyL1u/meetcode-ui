<template>
    <McSpace>
        <McPopover trigger="click" :show-delay="1000">
            <McButton type="success" ghost>点击，延迟1s显示</McButton>
            <template #content>这是测试内容</template>
        </McPopover>

        <McPopover :hide-delay="1000">
            <McButton type="success" ghost>悬浮，延迟1s隐藏</McButton>
            <template #content>这是测试内容</template>
        </McPopover>
    </McSpace>
</template>
<script lang="ts" setup>
import { McPopover, McSpace, McButton } from 'meetcode-ui';
</script>
