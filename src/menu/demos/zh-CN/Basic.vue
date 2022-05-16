<template>
    <McMenu v-model:value="menuKey" style="width: 300px">
        <McMenuItem :key="1">1</McMenuItem>
        <McMenuItem :key="2">2</McMenuItem>
        <McMenuItem :key="3">3</McMenuItem>
        <McMenuItemGroup title="group1">
            <McMenuItem :key="4">4</McMenuItem>
            <McMenuItem :key="5">5</McMenuItem>
        </McMenuItemGroup>
        <McMenuItemGroup title="group2">
            <McMenuItem :key="6">6</McMenuItem>
            <McMenuItem :key="7">7</McMenuItem>
        </McMenuItemGroup>
        <McSubMenu title="子菜单1">
            <McMenuItem :key="8">8</McMenuItem>
            <McMenuItem :key="9">9</McMenuItem>
        </McSubMenu>
    </McMenu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McMenu, McMenuItem, McMenuItemGroup, McSubMenu } from 'meetcode-ui';

const menuKey = ref(1);
</script>
