<template>
    <McGrid class="mc-w-3/4 mc-m-auto" :rows="5" :columns="5" :gap="12">
        <McGridItem :x="2" :y="1">
            <McPopover class="mc-w-40 mc-h-20" placement="top-start">
                <NButton class="mc-w-full" type="primary" ghost>top-start</NButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="3" :y="1">
            <McPopover class="mc-w-40 mc-h-20" placement="top">
                <NButton class="mc-w-full" type="primary" ghost>top</NButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="4" :y="1">
            <McPopover class="mc-w-40 mc-h-20" placement="top-end">
                <NButton class="mc-w-full" type="primary" ghost>top-end</NButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="1" :y="2">
            <McPopover class="mc-w-40 mc-h-20" placement="left-start">
                <NButton class="mc-w-full" type="primary" ghost>left-start</NButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="5" :y="2">
            <McPopover class="mc-w-40 mc-h-20" placement="right-start">
                <NButton class="mc-w-full" type="primary" ghost>right-start</NButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="1" :y="3">
            <McPopover class="mc-w-40 mc-h-20" placement="left">
                <NButton class="mc-w-full" type="primary" ghost>left</NButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="5" :y="3">
            <McPopover class="mc-w-40 mc-h-20" placement="right">
                <NButton class="mc-w-full" type="primary" ghost>right</NButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="1" :y="4">
            <McPopover class="mc-w-40 mc-h-20" placement="left-end">
                <NButton class="mc-w-full" type="primary" ghost>left-end</NButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="5" :y="4">
            <McPopover class="mc-w-40 mc-h-20" placement="right-end">
                <NButton class="mc-w-full" type="primary" ghost>right-end</NButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="2" :y="5">
            <McPopover class="mc-w-40 mc-h-20" placement="bottom-start">
                <NButton class="mc-w-full" type="primary" ghost>bottom-start</NButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="3" :y="5">
            <McPopover class="mc-w-40 mc-h-20" placement="bottom">
                <NButton class="mc-w-full" type="primary" ghost>bottom</NButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="4" :y="5">
            <McPopover class="mc-w-40 mc-h-20" placement="bottom-end">
                <NButton class="mc-w-full" type="primary" ghost>bottom-end</NButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
    </McGrid>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { McPopover, McGrid, McGridItem } from 'meetcode-ui';
</script>
