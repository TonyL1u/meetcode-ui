<template>
    <NSwitch v-model:value="followType" size="small" checked-value="click" unchecked-value="move" />
    <McPopover trigger="follow" :follow-type="followType">
        <div class="mc-h-40 mc-border mc-border-green-500 mc-border-dashed mc-flex mc-justify-center mc-items-center mc-mt-3.5">鼠标这里面{{ followType === 'click' ? '点击' : '移动' }}</div>
        <template #content>这是测试内容</template>
    </McPopover>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McPopover, PopoverFollowType } from 'meetcode-ui';
import { NSwitch } from 'naive-ui';

const followType = ref<PopoverFollowType>('click');
</script>
