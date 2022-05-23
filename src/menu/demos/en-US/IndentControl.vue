<template>
    <McMenu v-model:value="menuKey" :indent="12">
        <McMenuItem key="option1" :indent="20">Option 1</McMenuItem>
        <McMenuItem key="option2">Option 2</McMenuItem>
        <McSubMenu title="Sub Menu" :indent="40">
            <McMenuItem key="option3">Option 3</McMenuItem>
            <McMenuItem key="option4">Option 4</McMenuItem>
        </McSubMenu>
        <McMenuItemGroup title="Item Group" :indent="24">
            <McMenuItem key="option5">Option 5</McMenuItem>
            <McMenuItem key="option6">Option 6</McMenuItem>
        </McMenuItemGroup>
    </McMenu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McMenu, McMenuItem, McSubMenu, McMenuItemGroup } from 'meetcode-ui';

const menuKey = ref('');
</script>
