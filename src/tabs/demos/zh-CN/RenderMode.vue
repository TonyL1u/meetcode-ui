<template>
    <McTabs content-style="padding: 12px 2px 2px 2px">
        <McTabPane name="tab1" tab-label="v-if">
            <vIfInput />
        </McTabPane>
        <McTabPane name="tab2" tab-label="v-show(preload)" preload>
            <vShowPreloadInput />
        </McTabPane>
        <McTabPane name="tab3" tab-label="v-show(lazy)" lazy>
            <vShowLazyInput />
        </McTabPane>
    </McTabs>
</template>

<script lang="ts" setup>
import { createVNode } from 'vue';
import { McTabs, McTabPane, McInput } from 'meetcode-ui';

const vIfInput = () => {
    return createVNode(McInput, {
        placeholder: '切换tab后，内容会被销毁'
    });
};

const vShowPreloadInput = () => {
    console.log('tab2已渲染');
    return createVNode(McInput, {
        placeholder: '预加载。切换tab后，内容不会被销毁'
    });
};

const vShowLazyInput = () => {
    console.log('切换到tab3才渲染');
    return createVNode(McInput, {
        placeholder: '延迟加载。切换tab后，内容不会被销毁'
    });
};
</script>
