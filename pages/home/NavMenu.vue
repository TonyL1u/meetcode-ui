<template>
    <NPopover trigger="click" placement="bottom-end" :width="300" :style="{ 'min-height': '80vh', padding: 0 }">
        <template #trigger>
            <NIcon class="nav-menu-trigger" size="24">
                <IconMenu />
            </NIcon>
        </template>
        <Menu />
    </NPopover>
</template>

<script lang="ts" setup>
import { NPopover, NIcon } from 'naive-ui';
import { MenuOutline as IconMenu } from '@vicons/ionicons5';
import Menu from './Menu.vue';
</script>
