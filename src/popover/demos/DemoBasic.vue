<template>
    <McSpace>
        <McPopover title="标题" trigger="hover" content="这是测试内容">
            <McButton ghost>悬浮</McButton>
        </McPopover>

        <McPopover title="标题" trigger="click">
            <McButton ghost>点击</McButton>
            <template #content>这是测试内容</template>
        </McPopover>

        <McPopover title="标题" trigger="manual" :show="show">
            <McButton ghost @click="show = !show">手动</McButton>
            <template #content>这是测试内容</template>
        </McPopover>

        <McPopover title="标题" trigger="manual" :show="show" :x="200" :y="200">
            <McButton ghost @click="show = !show">手动，显式控制</McButton>
            <template #content>这是测试内容</template>
        </McPopover>
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McButton, McSpace, McPopover } from 'meetcode-ui';

const show = ref(false);
</script>
