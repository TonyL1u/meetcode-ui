<template>
    <McLayout>
        <McLayoutHeader bordered>Header</McLayoutHeader>
        <McLayout>
            <McLayoutSider bordered>Sider</McLayoutSider>
            <McLayoutContent>Content</McLayoutContent>
        </McLayout>
        <McLayoutFooter bordered>Footer</McLayoutFooter>
    </McLayout>
</template>

<script lang="ts" setup>
import { McLayout, McLayoutContent, McLayoutHeader, McLayoutFooter, McLayoutSider } from 'meetcode-ui';
</script>

<style lang="scss" scoped>
.mc-layout-sider {
    width: 100px;
}

.mc-layout-header,
.mc-layout-footer {
    height: 48px;
}

.mc-layout-content {
    height: 200px;
}
</style>
