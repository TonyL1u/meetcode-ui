<template>
    <McMenu v-model:value="menuKey" @update:value="handleUpdateValue">
        <McMenuItem key="option1">Option 1</McMenuItem>
        <McMenuItem key="option2">Option 2</McMenuItem>
        <McMenuItem key="option3">Option 3</McMenuItem>
        <McMenuItem key="option4">Option 4</McMenuItem>
    </McMenu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McMenu, McMenuItem, McSubMenu, McMessage } from 'meetcode-ui';

const menuKey = ref('option1');
const handleUpdateValue = (key: string) => {
    McMessage.text(`当前选中的 Key = ${key}`, { card: true });
};
</script>
