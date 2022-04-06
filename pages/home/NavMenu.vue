<template>
    <McPopover trigger="click" placement="bottom-end" :style="{ height: '90vh', padding: 0, width: '300px' }">
        <McIcon class="nav-menu-trigger" :size="24">
            <IconMenu />
        </McIcon>
        <template #content>
            <div class="mc-h-full mc-overflow-auto">
                <Menu />
            </div>
        </template>
    </McPopover>
</template>

<script lang="ts" setup>
import { McPopover, McIcon } from 'meetcode-ui';
import { MenuOutline as IconMenu } from '@vicons/ionicons5';
import Menu from './Menu.vue';
</script>
