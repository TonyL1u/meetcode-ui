<template>
    <McTabs :header-style="{ justifyContent: 'space-evenly' }" :tab-gap="0" :show-line="false" animation="scale">
        <McTabPane name="home">
            <template #tab>
                <McIcon style="margin-right: 8px">
                    <IconHome />
                </McIcon>
                Home
            </template>
            Home
        </McTabPane>
        <McTabPane name="message" tab-label="该属性设置无效">
            <template #tab>
                <McIcon style="margin-right: 8px">
                    <IconChat />
                </McIcon>
                Message
            </template>
            Message
        </McTabPane>
        <McTabPane name="user">
            <template #tab>
                <McIcon style="margin-right: 8px">
                    <IconUser />
                </McIcon>
                User
            </template>
            User
        </McTabPane>
        <McTabPane name="setting" :tab-label="tabLabelVNode">Setting</McTabPane>
    </McTabs>
</template>

<script lang="ts" setup>
import { createVNode, createTextVNode } from 'vue';
import { McTabs, McTabPane, McIcon } from 'meetcode-ui';
import { HomeOutline as IconHome, ChatbubbleOutline as IconChat, SettingsOutline as IconSetting, PersonOutline as IconUser } from '@vicons/ionicons5';

const tabLabelVNode = () => {
    return createVNode('div', { class: 'mc-flex mc-justify-evenly mc-items-center' }, [createVNode(McIcon, { style: 'margin-right: 8px' }, { default: () => createVNode(IconSetting) }), createTextVNode('Setting')]);
};
</script>
