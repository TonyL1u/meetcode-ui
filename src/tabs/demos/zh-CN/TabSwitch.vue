<template>
    <McTabs @tab-click="handleTabClick" @tab-switch="handleSwitchTab">
        <McTabPane name="tab1" tab-label="Tab 1">1</McTabPane>
        <McTabPane name="tab2" tab-label="Tab 2">2</McTabPane>
        <McTabPane name="tab3" tab-label="Tab 3">3</McTabPane>
        <McTabPane name="tab4" tab-label="Tab 4">4</McTabPane>
    </McTabs>
</template>

<script lang="ts" setup>
import { McTabs, McTabPane, TabPaneName, McMessage } from 'meetcode-ui';

const handleTabClick = (name: TabPaneName) => {
    McMessage.text(`click ${name}`);
};
const handleSwitchTab = (name: TabPaneName) => {
    McMessage.success(`switch to ${name}`);
};
</script>
