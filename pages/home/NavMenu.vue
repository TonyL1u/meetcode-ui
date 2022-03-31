<template>
    <McPopover trigger="click" placement="bottom-end" :style="{ height: '90vh', padding: 0, width: '300px', overflow: 'auto' }">
        <McIcon class="nav-menu-trigger" :size="24">
            <IconMenu />
        </McIcon>
        <template #content>
            <Menu />
        </template>
    </McPopover>
</template>

<script lang="ts" setup>
import { McPopover, McIcon } from 'meetcode-ui';
import { MenuOutline as IconMenu } from '@vicons/ionicons5';
import Menu from './Menu.vue';
</script>
