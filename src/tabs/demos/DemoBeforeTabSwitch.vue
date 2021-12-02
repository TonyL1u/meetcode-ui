<template>
    <McTabs @before-tab-switch="handleBeforeTabSwitch">
        <McTabPane name="tab1" tab-label="Tab 1">1</McTabPane>
        <McTabPane name="tab2" :tab-label="countDown ? `${countDown}秒后切换` : `Tab 2`">2</McTabPane>
        <McTabPane name="tab3" tab-label="不能切换">3</McTabPane>
        <McTabPane name="tab4" tab-label="Tab 4">4</McTabPane>
    </McTabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McTabs, McTabPane, TabPaneName } from 'meetcode-ui';

const countDown = ref(0);
const sleep = (wait: number) => {
    if (wait <= 0) return;

    countDown.value = wait;
    return new Promise<void>(resolve => {
        const timer = setInterval(() => {
            if (--countDown.value === 0) {
                clearInterval(timer);
                resolve();
            }
        }, 1000);
    });
};

const handleBeforeTabSwitch = async (from?: TabPaneName, to?: TabPaneName) => {
    switch (to) {
        case 'tab1':
            break;
        case 'tab2':
            await sleep(3);
            break;
        case 'tab3':
            return false;
        case 'tab4':
            return true;
    }
};
</script>
