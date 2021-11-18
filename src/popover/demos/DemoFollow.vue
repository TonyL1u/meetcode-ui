<template>
    <McPopover trigger="follow" placement="bottom-start" :offset="{ top: '4px', left: '8px' }" :with-arrow="false">
        <div class="mc-h-40 mc-border mc-border-green-500 mc-border-dashed mc-flex mc-justify-center mc-items-center">鼠标这里面移动</div>
        <template #content>这是测试内容</template>
    </McPopover>
</template>

<script lang="ts" setup>
import { McPopover } from 'meetcode-ui';
</script>
