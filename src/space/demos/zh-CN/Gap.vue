<template>
    <McSpace :gap="40">
        <McButton render="link">
            <template #icon>
                <McIcon :size="14" style="margin-right: 4px">
                    <IconHome />
                </McIcon>
            </template>
            Home
        </McButton>
        <McButton render="link">
            <template #icon>
                <McIcon :size="14" style="margin-right: 4px">
                    <IconChat />
                </McIcon>
            </template>
            Message
        </McButton>
        <McButton render="link">
            <template #icon>
                <McIcon :size="14" style="margin-right: 4px">
                    <IconUser />
                </McIcon>
            </template>
            User
        </McButton>
        <McButton render="link">
            <template #icon>
                <McIcon :size="14" style="margin-right: 4px">
                    <IconSetting />
                </McIcon>
            </template>
            Setting
        </McButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { McSpace, McButton, McIcon } from 'meetcode-ui';
import { HomeOutline as IconHome, ChatbubbleOutline as IconChat, SettingsOutline as IconSetting, PersonOutline as IconUser } from '@vicons/ionicons5';
</script>
