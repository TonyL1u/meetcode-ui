<template>
    <McTabs :header-style="{ justifyContent: 'space-evenly' }" :tab-gap="0" :show-line="false" animation="scale">
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
        <McTabPane name="setting" :tab-label="tabLabelVNode">Setting</McTabPane>
    </McTabs>
</template>

<script lang="ts" setup>
import { NIcon } from 'naive-ui';
import { createVNode, createTextVNode } from 'vue';
import { McTabs, McTabPane } from 'meetcode-ui';
import { HomeOutline as IconHome, ChatbubbleOutline as IconChat, SettingsOutline as IconSetting, PersonOutline as IconUser } from '@vicons/ionicons5';

const tabLabelVNode = () => {
    return createVNode('div', { class: 'mc-flex mc-justify-evenly mc-items-center' }, [createVNode(NIcon, { style: 'margin-right: 8px' }, { default: () => createVNode(IconSetting) }), createTextVNode('Setting')]);
};
</script>
