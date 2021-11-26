<template>
    <McTabs>
        <McTabPane name="test1" tab-label="测试1">1</McTabPane>
        <McTabPane name="test2" tab-label="测试2">2</McTabPane>
        <McTabPane name="test3" tab-label="测试3">3</McTabPane>
        <McTabPane name="test4" tab-label="测试4">4</McTabPane>
        <McTabPane name="test5" tab-label="测试5">5</McTabPane>
        <!-- <McTab name="test1">测试1</McTab>
        <McTab name="test2">测试2</McTab>
        <McTab name="test3">测试3</McTab>
        <McTab name="test4">测试4</McTab>
        <McTab name="test5">测试5</McTab> -->
        <McTab name="test6" @click="handleClick" class="mc-text-blue-500" style="background: red">测试6</McTab>
    </McTabs>
</template>

<script lang="ts" setup>
import { McTabs, McTabPane, McTab } from 'meetcode-ui';

const handleClick = () => {
    console.log(1);
};
</script>
