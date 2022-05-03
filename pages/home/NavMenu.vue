<template>
    <McIcon class="nav-menu-trigger" :size="24" @click="show = true">
        <IconMenu />
    </McIcon>
    <McDrawer v-model:show="show" appear-direction="left" size="85vw" :show-header="false" :body-style="{ padding: '0px' }">
        <Menu @update:value="show = false" />
    </McDrawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McIcon, McDrawer } from 'meetcode-ui';
import { MenuOutline as IconMenu } from '@vicons/ionicons5';
import Menu from './Menu.vue';

const show = ref(false);
</script>
