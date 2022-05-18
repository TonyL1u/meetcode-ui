<template>
    <McMenu v-model:value="menuKey">
        <McMenuItem key="Option1">Option 1</McMenuItem>
        <McMenuItem key="Option2">Option 2</McMenuItem>
        <McMenuItem key="Option3">Option 3</McMenuItem>
        <McMenuItem key="Option4">Option 4</McMenuItem>
    </McMenu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McMenu, McMenuItem } from 'meetcode-ui';

const menuKey = ref('Option1');
</script>
