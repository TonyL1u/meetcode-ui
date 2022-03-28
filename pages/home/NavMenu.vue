<template>
    <McPopover trigger="click" placement="bottom-end" :style="{ height: '90vh', padding: 0, width: '300px', overflow: 'auto' }">
        <NIcon class="nav-menu-trigger" size="24">
            <IconMenu />
        </NIcon>
        <template #content>
            <Menu />
        </template>
    </McPopover>
</template>

<script lang="ts" setup>
import { NIcon } from 'naive-ui';
import { MenuOutline as IconMenu } from '@vicons/ionicons5';
import { McPopover } from 'meetcode-ui';
import Menu from './Menu.vue';
</script>
