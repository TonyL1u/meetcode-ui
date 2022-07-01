<script lang="ts" setup>
import { McButton, McSpace } from 'meetcode-ui';

const emit = defineEmits<{ (e: 'close'): void }>();

const handleClick = () => {
    emit('close');
};
</script>

<template>
    <div class="mc-flex mc-flex-col mc-h-full">
        <div class="mc-flex-1">暂无数据</div>
        <McSpace justify="flex-end">
            <McButton ghost @click="handleClick">取消</McButton>
            <McButton type="success" @click="handleClick">确定</McButton>
        </McSpace>
    </div>
</template>
