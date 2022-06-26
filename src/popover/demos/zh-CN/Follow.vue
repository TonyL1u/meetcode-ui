<template>
    <McSwitch v-model:value="followMode" checked-value="click" unchecked-value="move" />
    <McPopover trigger="follow" :follow-mode="followMode">
        <div class="mc-h-40 mc-border mc-border-green-500 mc-border-dashed mc-flex mc-justify-center mc-items-center mc-mt-3.5">鼠标这里面{{ followMode === 'click' ? '点击' : '移动' }}</div>
        <template #content>这是测试内容</template>
    </McPopover>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McPopover, McSwitch, PopoverFollowMode } from 'meetcode-ui';

const followMode = ref<PopoverFollowMode>('click');
</script>
