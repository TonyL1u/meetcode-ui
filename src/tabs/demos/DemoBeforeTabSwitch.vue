<template>
    <McTabs @before-tab-switch="handleBeforeTabSwitch">
        <McTabPane name="tab1" tab-label="Tab 1">1</McTabPane>
        <McTabPane name="tab2" :tab-label="countDown ? `${countDown}秒后切换` : `Tab 2`" :disabled="!!countDown">2</McTabPane>
        <McTabPane name="tab3" tab-label="不能切换">3</McTabPane>
        <McTabPane name="tab4" tab-label="Tab 4">4</McTabPane>
    </McTabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McTabs, McTabPane, TabPaneName, McMessage, McAsyncMessage } from 'meetcode-ui';

const countDown = ref(0);

const handleBeforeTabSwitch = async (from: TabPaneName, to: TabPaneName) => {
    switch (to) {
        case 'tab1':
            break;
        case 'tab2':
            countDown.value = 3;
            const timer = setInterval(() => {
                if (--countDown.value === 0) {
                    clearInterval(timer);
                }
            }, 1000);
            await McAsyncMessage.loading('切换中...');
            break;
        case 'tab3':
            McMessage.error('不能切换');
            return false;
        case 'tab4':
            return true;
    }
};
</script>
