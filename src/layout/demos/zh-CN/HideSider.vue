<template>
    <McLayout>
        <McLayoutSider bordered collapsable :collapsed-width="0" transition-mode="transform" trigger-type="bar">Sider</McLayoutSider>
        <McLayout>
            <McLayoutContent />
            <McLayoutSider bordered collapsable :collapsed-width="0" @before-toggle="handleBeforeToggle" @toggled="handleToggled" />
        </McLayout>
    </McLayout>
</template>

<script lang="ts" setup>
import { McLayout, McLayoutContent, McLayoutSider, McPopup, McMessage } from 'meetcode-ui';

const handleBeforeToggle = (isCollapsed: boolean) => {
    const { show } = McPopup(isCollapsed ? '是否展开？' : '是否隐藏？');
    return new Promise<boolean>(resolve => {
        show({
            title: '请确认',
            width: 300,
            onBeforeLeave(action) {
                if (action === 'confirm') {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }
        });
    });
};
const handleToggled = (isCollapsed: boolean) => {
    McMessage.text(isCollapsed ? '已收起' : '已展开', { card: true });
};
</script>

<style lang="scss" scoped>
.mc-layout-content {
    height: 200px;
    padding: 24px;
}
</style>
