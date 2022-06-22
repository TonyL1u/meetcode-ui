<template>
    <McSpace>
        <McSwitch checked @before-switch="handleBeforeSwitch1" />
        <McSwitch :loading="loading" :disabled="loading" @before-switch="handleBeforeSwitch2" />
    </McSpace>
</template>

<script lang="ts" setup>
import { ref, createVNode } from 'vue';
import { McSpace, McSwitch, McMessage, McTextLink } from 'meetcode-ui';

const loading = ref(false);

const handleBeforeSwitch1 = () => {
    McMessage.error('不允许切换', {
        card: true
    });

    return false;
};

const handleBeforeSwitch2 = async () => {
    if (loading.value) return;

    loading.value = true;
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            const isError = Math.random() >= 0.4;
            if (isError) {
                McMessage.error('系统错误，请稍后重试。', {
                    card: true,
                    style: 'width: 300px',
                    action: () =>
                        createVNode(
                            McTextLink,
                            { type: 'success' },
                            {
                                default: () => '查看详情'
                            }
                        )
                });
                reject();
            }
            resolve();
        }, 2000);
    }).finally(() => {
        loading.value = false;
    });
};
</script>
