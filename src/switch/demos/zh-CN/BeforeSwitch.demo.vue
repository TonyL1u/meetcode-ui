<markdown>
### 切换前的回调

通过钩子函数 `on-before-switch` 来控制开关的切换行为。返回 `false` 或者一个被 `reject` 的 `Promise` 时会阻止切换。
</markdown>

<template>
    <McSpace>
        <McSwitch checked @before-switch="handleBeforeSwitch1" />
        <McSwitch :loading="loading" :disabled="loading" @before-switch="handleBeforeSwitch2">
            <template #icon>
                <McIcon v-if="isFetched" :icon="isError ? CloseOutline : CheckmarkOutline" :size="16" />
                <McIcon v-else :icon="RadioButtonOff" :size="12" />
            </template>
        </McSwitch>
    </McSpace>
</template>

<script lang="ts" setup>
import { ref, createVNode } from 'vue';
import { McSpace, McSwitch, McIcon, McMessage, McTextLink } from 'meetcode-ui';
import { RadioButtonOff, CloseOutline, CheckmarkOutline } from '@vicons/ionicons5';

const loading = ref(false);
const isError = ref(false);
const isFetched = ref(false);

const handleBeforeSwitch1 = () => {
    McMessage.error('不允许切换', {
        card: true
    });

    return false;
};
const handleBeforeSwitch2 = async () => {
    if (loading.value || isFetched.value) return false;

    loading.value = true;
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            isError.value = Math.random() >= 0.4;
            if (isError.value) {
                McMessage.error('系统错误，请稍后重试。', {
                    card: true,
                    style: 'width: 300px',
                    action: () => createVNode(McTextLink, { type: 'success' }, { default: () => '查看详情' })
                });
                reject();
            }
            resolve();
        }, 2000);
    }).finally(() => {
        loading.value = false;
        isFetched.value = true;

        setTimeout(() => {
            isFetched.value = false;
        }, 1000);
    });
};
</script>
