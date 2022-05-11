<template>
    <McLayout style="height: 300px">
        <McLayoutHeader />
        <McLayout style="flex: 1">
            <McLayoutSider />
            <McLayoutContent>
                <div style="height: 500px; display: flex; flex-direction: column; justify-content: space-between">
                    <div>滚动</div>
                    <div>滚动</div>
                    <div>滚动</div>
                    <div>滚动</div>
                    <div>滚动</div>
                </div>
            </McLayoutContent>
        </McLayout>
    </McLayout>
</template>

<script lang="ts" setup>
import { McLayout, McLayoutContent, McLayoutHeader, McLayoutFooter, McLayoutSider } from 'meetcode-ui';
</script>

<style lang="scss" scoped>
.mc-layout-header,
.mc-layout-content,
.mc-layout-footer,
.mc-layout-sider {
    padding: 12px;
}

.mc-layout-sider {
    background: #a7f3d0;
    width: 100px;
}

.mc-layout-header,
.mc-layout-footer {
    background: #d1fae5;
    height: 32px;
}

.mc-layout-content {
    background: #6ee7b7;
}
</style>
