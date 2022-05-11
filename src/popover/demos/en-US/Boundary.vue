<template>
    <McPopover trigger="follow" placement="bottom-start" :offset="{ top: '4px', left: '8px' }" :with-arrow="false" wrap-boundary @border-reached="handleBorderReached">
        <div class="mc-h-40 mc-bg-green-400 mc-flex mc-justify-center mc-items-center" :style="{ background: isReachBorder ? '#f87171' : '' }">
            {{ isReachBorder ? `${reachedDirs} is exceeding` : 'Boundary Restrictions' }}
        </div>
        <template #content>This is test content</template>
    </McPopover>
</template>

<script lang="ts" setup>
import { McPopover, PopoverTriggerBorder } from 'meetcode-ui';
import { ref } from 'vue';

const isReachBorder = ref(false);
const reachedDirs = ref<PopoverTriggerBorder[]>([]);

const handleBorderReached = (flag: boolean, dirs: Array<PopoverTriggerBorder>) => {
    isReachBorder.value = flag;
    reachedDirs.value = dirs;
};
</script>
