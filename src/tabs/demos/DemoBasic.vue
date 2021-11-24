<template>
    <McTabs @before-tab-switch="handleSwitch">
        <McTabPane name="test1" tab-label="测试1">1</McTabPane>
        <McTabPane name="test2" tab-label="测试2">2</McTabPane>
        <McTabPane name="test3" tab-label="测试3">3</McTabPane>
        <McTabPane name="test4" tab-label="测试4">4</McTabPane>
        <McTabPane name="test5" tab-label="测试5">5</McTabPane>
    </McTabs>
</template>

<script lang="ts" setup>
import { McTabs, McTabPane } from 'meetcode-ui';

const handleSwitch = (from?: string | number, to?: string | number) => {
    console.log(from, to);
    if (to === 'test2') return false;
};
</script>
