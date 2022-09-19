<template>
    <McSwitch v-model:value="followMode" checked-value="click" unchecked-value="move" />
    <McPopover trigger="follow" :follow-mode="followMode">
        <div class="mc-h-40 mc-border mc-border-green-500 mc-border-dashed mc-flex mc-justify-center mc-items-center mc-mt-3.5">{{ `Mouse ${followMode} in here` }}</div>
        <template #content>This is test content</template>
    </McPopover>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McPopover, McSwitch, PopoverFollowMode } from 'meetcode-ui';

const followMode = ref<PopoverFollowMode>('click');
</script>
