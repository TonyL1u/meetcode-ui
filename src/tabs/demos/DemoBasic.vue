<template>
    <McTabs v-model:value="value" @before-tab-switch="handleSwitch" ref="tabs">
        <McTabPane name="test1" tab-label="测试1" preload>1</McTabPane>
        <McTabPane name="test2" tab-label="测试2">2</McTabPane>
        <McTabPane name="test3" tab-label="测试3" lazy>3</McTabPane>
        <McTabPane name="test4" tab-label="测试4">4</McTabPane>
        <McTabPane name="test5" tab-label="测试5">5</McTabPane>
        <McTab name="test6" class="mc-text-blue-500" style="background: red">测试6</McTab>
        12345
    </McTabs>
    {{ value }}
    <button @click="handleClick">TEST</button>

    <n-tabs default-value="if">
        <n-tab-pane name="show" display-directive="show" tab="show"> 1 </n-tab-pane>
        <n-tab-pane name="if" display-directive="if" tab="if"> 2 </n-tab-pane>
        <n-tab-pane name="show:lazy" display-directive="show:lazy" tab="show:lazy"> 3 </n-tab-pane>
        123
    </n-tabs>
</template>

<script lang="ts" setup>
import { NTabs, NTabPane } from 'naive-ui';
import { ref } from 'vue';
import { McTabs, McTabPane, McTab } from 'meetcode-ui';

const value = ref('test6');
const tabs = ref();
const handleClick = () => {
    // value.value = 'test3';
    const { switchTo } = tabs.value;
    console.log(tabs.value);
    switchTo('test3');
};
const handleSwitch = () => {
    console.log(1);
};
</script>
