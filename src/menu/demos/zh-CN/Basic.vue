<template>
    <McMenu style="width: 300px" v-model:value="menuKey">
        <McMenuItem :key="1">1</McMenuItem>
        <McMenuItem :key="2">2</McMenuItem>
        <McMenuItem :key="3">3</McMenuItem>
        <McMenuItemGroup title="文档">
            <McMenuItem :key="4">4</McMenuItem>
        </McMenuItemGroup>
    </McMenu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McMenu, McMenuItem, McMenuItemGroup } from 'meetcode-ui';

const menuKey = ref(1);
</script>
