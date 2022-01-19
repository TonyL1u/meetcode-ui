<template>
    <McSpace>
        <McTextLink type="primary">主要文字链接</McTextLink>
        <McTextLink type="success">成功文字链接</McTextLink>
        <McTextLink type="warning">警告文字链接</McTextLink>
        <McTextLink type="danger"> 危险文字链接</McTextLink>
        <McTextLink type="info">信息文字链接</McTextLink>
    </McSpace>
    <McTextLink class="mc-mt-2" to="https://www.baidu.com" block>点我跳转到www.baidu.com</McTextLink>
</template>

<script lang="ts" setup>
import { McTextLink, McSpace } from 'meetcode-ui';
</script>
