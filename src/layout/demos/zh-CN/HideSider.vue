<template>
    <McLayout>
        <McLayoutSider bordered collapsable />
        <McLayoutContent>可折叠的侧边栏</McLayoutContent>
    </McLayout>
</template>

<script lang="ts" setup>
import { McLayout, McLayoutContent, McLayoutSider } from 'meetcode-ui';
</script>

<style lang="scss" scoped>
.mc-layout-content {
    height: 200px;
    padding: 24px;
}
</style>
