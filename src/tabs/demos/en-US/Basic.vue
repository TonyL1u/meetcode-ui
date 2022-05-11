<template>
    <McTabs>
        <McTabPane name="test1" tab-label="Tab 1">1</McTabPane>
        <McTabPane name="test2" tab-label="Tab 2">2</McTabPane>
        <McTabPane name="test3" tab-label="Tab 3" disabled>3</McTabPane>
        <McTabPane name="test4" tab-label="Tab 4">4</McTabPane>
    </McTabs>
</template>

<script lang="ts" setup>
import { McTabs, McTabPane } from 'meetcode-ui';
</script>
