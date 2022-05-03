<template>
    <McButton type="success" ghost @click="show = true">打开</McButton>

    <McDrawer v-model:show="show" title="抽屉" @before-leave="handleBeforeLeave">内容</McDrawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McDrawer, McPopup, McButton, DrawerCloseAction } from 'meetcode-ui';

const show = ref(false);

const handleBeforeLeave = (action: DrawerCloseAction) => {
    if (action === 'wrapper') {
        const instance = McPopup('是否关闭当前窗口？');
        instance.show({
            title: '请确认',
            width: 300,
            animation: 'slide',
            onConfirm() {
                show.value = false;
            }
        });

        return true;
    }
};
</script>
