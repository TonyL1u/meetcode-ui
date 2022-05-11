<template>
    <McGrid class="mc-w-3/4 mc-m-auto" :rows="5" :columns="5" :gap="12">
        <McGridItem :x="2" :y="1">
            <McPopover trigger="click" style="height: 80px; width: 160px" placement="top-start">
                <McButton type="success" ghost block>top-start</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="3" :y="1">
            <McPopover trigger="click" style="height: 80px; width: 160px" placement="top">
                <McButton type="success" ghost block>top</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="4" :y="1">
            <McPopover trigger="click" style="height: 80px; width: 160px" placement="top-end">
                <McButton type="success" ghost block>top-end</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="1" :y="2">
            <McPopover trigger="click" style="height: 80px; width: 160px" placement="left-start">
                <McButton type="success" ghost block>left-start</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="5" :y="2">
            <McPopover trigger="click" style="height: 80px; width: 160px" placement="right-start">
                <McButton type="success" ghost block>right-start</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="1" :y="3">
            <McPopover trigger="click" style="height: 80px; width: 160px" placement="left">
                <McButton type="success" ghost block>left</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="5" :y="3">
            <McPopover trigger="click" style="height: 80px; width: 160px" placement="right">
                <McButton type="success" ghost block>right</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="1" :y="4">
            <McPopover trigger="click" style="height: 80px; width: 160px" placement="left-end">
                <McButton type="success" ghost block>left-end</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="5" :y="4">
            <McPopover trigger="click" style="height: 80px; width: 160px" placement="right-end">
                <McButton type="success" ghost block>right-end</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="2" :y="5">
            <McPopover trigger="click" style="height: 80px; width: 160px" placement="bottom-start">
                <McButton type="success" ghost block>bottom-start</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="3" :y="5">
            <McPopover trigger="click" style="height: 80px; width: 160px" placement="bottom">
                <McButton type="success" ghost block>bottom</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
        <McGridItem :x="4" :y="5">
            <McPopover trigger="click" style="height: 80px; width: 160px" placement="bottom-end">
                <McButton type="success" ghost block>bottom-end</McButton>
                <template #content>这是测试内容</template>
            </McPopover>
        </McGridItem>
    </McGrid>
</template>

<script lang="ts" setup>
import { McPopover, McGrid, McGridItem, McButton } from 'meetcode-ui';
</script>
