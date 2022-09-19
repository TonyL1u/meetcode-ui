<template>
    <McLayout>
        <McLayoutHeader />
        <McLayoutContent />
    </McLayout>

    <McLayout style="margin-top: 12px">
        <McLayoutSider />
        <McLayoutContent />
    </McLayout>

    <McLayout style="margin-top: 12px">
        <McLayoutHeader />
        <McLayout>
            <McLayoutContent />
            <McLayoutSider />
        </McLayout>
        <McLayoutFooter />
    </McLayout>

    <McLayout style="margin-top: 12px">
        <McLayoutSider />
        <McLayout>
            <McLayoutHeader />
            <McLayoutContent />
            <McLayoutFooter />
        </McLayout>
    </McLayout>
</template>

<script lang="ts" setup>
import { McLayout, McLayoutContent, McLayoutHeader, McLayoutFooter, McLayoutSider } from 'meetcode-ui';
</script>

<style lang="scss" scoped>
.mc-layout-sider {
    background: #a7f3d0;
    width: 100px;
}

.mc-layout-header,
.mc-layout-footer {
    background: #d1fae5;
    height: 48px;
}

.mc-layout-content {
    background: #6ee7b7;
    height: 200px;
}
</style>
