<template>
    <McMenu v-model:value="menuKey">
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
        <McSubMenu key="sub-menu-1" title="子菜单1">
            <template #icon>
                <McIcon>
                    <CubeOutline />
                </McIcon>
            </template>
            <!-- <McMenuItem :key="8">8</McMenuItem>
            <McMenuItem :key="9">9</McMenuItem> -->
            <!-- <McMenuItemGroup title="group3">
                <McMenuItem :key="10">10</McMenuItem>
                <McMenuItem :key="11">11</McMenuItem>
                <McSubMenu title="子菜单2">
                    <template #icon>
                        <McIcon>
                            <CubeOutline />
                        </McIcon>
                    </template>
                    <McMenuItem :key="12">12</McMenuItem>
                    <McMenuItem :key="13">13</McMenuItem>
                    <McMenuItemGroup title="group4">
                        <McMenuItem :key="14">14</McMenuItem>
                        <McMenuItem :key="15">15</McMenuItem>
                    </McMenuItemGroup>
                    <McSubMenu title="子菜单4">
                        <template #icon>
                            <McIcon>
                                <CubeOutline />
                            </McIcon>
                        </template>
                        <McMenuItem :key="1">1</McMenuItem>
                        <McMenuItem :key="2">2</McMenuItem>
                        <McMenuItemGroup title="group4">
                        <McMenuItem :key="14">14</McMenuItem>
                        <McMenuItem :key="15">15</McMenuItem>
                    </McMenuItemGroup>
                    </McSubMenu>
                </McSubMenu>
            </McMenuItemGroup> -->
            <!-- <McMenuItem :key="7">7</McMenuItem> -->
            <McMenuItemGroup title="group4">
                <McMenuItem :key="14">14</McMenuItem>
                <McMenuItem :key="15">15</McMenuItem>
            </McMenuItemGroup>
            <McSubMenu key="sub-menu-2" title="子菜单3">
                <template #icon>
                    <McIcon>
                        <CubeOutline />
                    </McIcon>
                </template>
                <McMenuItem :key="16">16</McMenuItem>
                <McMenuItem :key="17">17</McMenuItem>
                <!-- <McMenuItemGroup title="group4">
                        <McMenuItem :key="14">14</McMenuItem>
                        <McMenuItem :key="15">15</McMenuItem>
                    </McMenuItemGroup> -->
            </McSubMenu>
            <McSubMenu key="sub-menu-3" title="子菜单2">
                <template #icon>
                    <McIcon>
                        <CubeOutline />
                    </McIcon>
                </template>
                <McMenuItem :key="12">12</McMenuItem>
                <McMenuItem :key="13">13</McMenuItem>
            </McSubMenu>
        </McSubMenu>
        <McSubMenu key="sub-menu-4" title="子菜单2">
            <template #icon>
                <McIcon>
                    <CubeOutline />
                </McIcon>
            </template>
            <McMenuItem :key="10">10</McMenuItem>
            <McMenuItem :key="11">11</McMenuItem>
        </McSubMenu>
        <!-- <McMenuItemGroup title="group4">
            <McMenuItem :key="14">14</McMenuItem>
            <McMenuItem :key="15">15</McMenuItem>
        </McMenuItemGroup> -->
        <!-- <McSubMenu title="子菜单2">
            <template #icon>
                <McIcon>
                    <CubeOutline />
                </McIcon>
            </template>
            <McMenuItem :key="12">12</McMenuItem>
            <McMenuItem :key="13">13</McMenuItem>
            <McMenuItemGroup title="group4">
                <McMenuItem :key="14">14</McMenuItem>
                <McMenuItem :key="15">15</McMenuItem>
            </McMenuItemGroup>
        </McSubMenu> -->
    </McMenu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McMenu, McMenuItem, McMenuItemGroup, McSubMenu, McIcon } from 'meetcode-ui';
import { CubeOutline } from '@vicons/ionicons5';

const menuKey = ref(11);
const expandSubMenuKeys = ref(['sub-menu-1', 'sub-menu-2']);
</script>
