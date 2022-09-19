<template>
    <McButton type="success" ghost @click="show = true">Open</McButton>

    <McDrawer v-model:show="show" title="Drawer" @before-leave="handleBeforeLeave">Something...</McDrawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McDrawer, McPopup, McButton, DrawerCloseAction } from 'meetcode-ui';

const show = ref(false);

const handleBeforeLeave = (action: DrawerCloseAction) => {
    if (action === 'wrapper') {
        const instance = McPopup('Are you sure to close?');
        instance.show({
            title: 'Confirm',
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
