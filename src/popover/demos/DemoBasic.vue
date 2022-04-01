<template>
    <McSpace>
        <McPopover title="标题" trigger="hover" content="这是测试内容">
            <McButton type="success" ghost>悬浮</McButton>
        </McPopover>

        <McPopover title="标题" trigger="click">
            <McButton type="success" ghost>点击</McButton>
            <template #content>这是测试内容</template>
        </McPopover>

        <McPopover title="标题" trigger="manual" :show="show">
            <McButton type="success" ghost @click="show = !show">手动</McButton>
            <template #content>这是测试内容</template>
        </McPopover>

        <McPopover title="标题" trigger="manual" :show="show" :x="200" :y="200">
            <McButton type="success" ghost @click="show = !show">手动，显式控制</McButton>
            <template #content>这是测试内容</template>
        </McPopover>

        <McPopover title="标题" trigger="click">
            <McButton type="success" ghost>点击</McButton>
            <template #content>
                <McPopover title="标题" trigger="click" content="这是测试内容">
                    <McButton type="success" ghost>悬浮</McButton>
                </McPopover>
            </template>
        </McPopover>

        <n-popover trigger="hover">
            <template #trigger>
                <McButton>悬浮</McButton>
            </template>
            <n-popover trigger="hover">
                <template #trigger>
                    <McButton>悬浮</McButton>
                </template>
                <span>或许不想知道你的花园长得咋样</span>
            </n-popover>
        </n-popover>
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McButton, McSpace, McPopover } from 'meetcode-ui';
import { NPopover } from 'naive-ui';

const show = ref(false);
</script>
