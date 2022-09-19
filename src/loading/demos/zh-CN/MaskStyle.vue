<template>
    <McLoading type="arcs" :show="show" :mask-style="{ background: '#fff' }">
        <div class="mc-h-24 mc-bg-green-300 mc-text-white mc-flex mc-justify-center mc-items-center">这是一个DIV</div>
        <template #description>加载中...</template>
    </McLoading>

    <McButton class="mc-mt-5" type="success" @click="show = !show" ghost>点我加载</McButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McLoading, McButton } from 'meetcode-ui';

const show = ref(false);
</script>
