<template>
    <McTabs type="bar" :header-style="{ justifyContent: 'space-evenly' }" :tab-gap="0">
        <McTabPane name="home">
            <template #tab>
                <NIcon style="margin-right: 8px">
                    <IconHome />
                </NIcon>
                Home
            </template>
            Home
        </McTabPane>
        <McTabPane name="message" tab-label="该属性设置无效">
            <template #tab>
                <NIcon style="margin-right: 8px">
                    <IconChat />
                </NIcon>
                Message
            </template>
            Message
        </McTabPane>
        <McTabPane name="user">
            <template #tab>
                <NIcon style="margin-right: 8px">
                    <IconUser />
                </NIcon>
                User
            </template>
            User
        </McTabPane>
        <McTabPane name="setting">
            <template #tab>
                <NIcon style="margin-right: 8px">
                    <IconSetting />
                </NIcon>
                Setting
            </template>
            Setting
        </McTabPane>
    </McTabs>
</template>

<script lang="ts" setup>
import { NIcon } from 'naive-ui';
import { McTabs, McTabPane } from 'meetcode-ui';
import { HomeOutline as IconHome, ChatbubbleOutline as IconChat, SettingsOutline as IconSetting, PersonOutline as IconUser } from '@vicons/ionicons5';
</script>
