<template>
    <McGrid class="mc-w-3/4 mc-m-auto" :rows="5" :columns="5" :gap="12">
        <McGridItem :x="2" :y="1">
            <McPopover class="mc-w-40 mc-h-20" placement="top-start">
                <McButton class="mc-w-full" type="success" ghost>top-start</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="3" :y="1">
            <McPopover class="mc-w-40 mc-h-20" placement="top">
                <McButton class="mc-w-full" type="success" ghost>top</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="4" :y="1">
            <McPopover class="mc-w-40 mc-h-20" placement="top-end">
                <McButton class="mc-w-full" type="success" ghost>top-end</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="1" :y="2">
            <McPopover class="mc-w-40 mc-h-20" placement="left-start">
                <McButton class="mc-w-full" type="success" ghost>left-start</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="5" :y="2">
            <McPopover class="mc-w-40 mc-h-20" placement="right-start">
                <McButton class="mc-w-full" type="success" ghost>right-start</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="1" :y="3">
            <McPopover class="mc-w-40 mc-h-20" placement="left">
                <McButton class="mc-w-full" type="success" ghost>left</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="5" :y="3">
            <McPopover class="mc-w-40 mc-h-20" placement="right">
                <McButton class="mc-w-full" type="success" ghost>right</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="1" :y="4">
            <McPopover class="mc-w-40 mc-h-20" placement="left-end">
                <McButton class="mc-w-full" type="success" ghost>left-end</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="5" :y="4">
            <McPopover class="mc-w-40 mc-h-20" placement="right-end">
                <McButton class="mc-w-full" type="success" ghost>right-end</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="2" :y="5">
            <McPopover class="mc-w-40 mc-h-20" placement="bottom-start">
                <McButton class="mc-w-full" type="success" ghost>bottom-start</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="3" :y="5">
            <McPopover class="mc-w-40 mc-h-20" placement="bottom">
                <McButton class="mc-w-full" type="success" ghost>bottom</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="4" :y="5">
            <McPopover class="mc-w-40 mc-h-20" placement="bottom-end">
                <McButton class="mc-w-full" type="success" ghost>bottom-end</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
    </McGrid>
</template>

<script lang="ts" setup>
import { McPopover, McGrid, McGridItem, McButton } from 'meetcode-ui';
</script>
