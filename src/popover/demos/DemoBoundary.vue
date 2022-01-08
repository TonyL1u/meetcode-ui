<template>
    <McPopover trigger="follow" placement="bottom-start" :offset="{ top: '4px', left: '8px' }" :with-arrow="false" wrap-boundary @show="handleShow" @hide="handleHide" @border:reached="handleBorderReached">
        <div class="mc-h-40 mc-bg-green-400 mc-flex mc-justify-center mc-items-center" :style="{ background: isReachBorder ? '#f87171' : '' }">
            {{ isReachBorder ? `${reachedDirs}溢出了` : '边界限制' }}
        </div>
        <template #content>这是测试内容</template>
    </McPopover>
</template>

<script lang="ts" setup>
import { McPopover, McMessage } from 'meetcode-ui';
import { ref } from 'vue';

const isReachBorder = ref(false);
const reachedDirs = ref<any>([]);

const handleShow = () => {
    McMessage.success('show');
};

const handleHide = () => {
    McMessage.success('hide');
};

const handleBorderReached = (flag: boolean, dirs: Array<any>) => {
    isReachBorder.value = flag;
    reachedDirs.value = dirs;
};
</script>
