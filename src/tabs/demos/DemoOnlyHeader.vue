<template>
    <McTabs>
        <McTab name="tab1">Tab 1</McTab>
        <McTab name="tab2">Tab 2</McTab>
        <McTab name="tab3">Tab 3</McTab>
        <McTabPane name="tab4" tab-label="TabPane">1</McTabPane>
    </McTabs>
</template>

<script lang="ts" setup>
import { McTabs, McTabPane, McTab } from 'meetcode-ui';
</script>
