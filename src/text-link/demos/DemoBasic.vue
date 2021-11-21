<template>
    <McTextLink type="primary" :block="true">这是一个 主要 文字链接1</McTextLink>
    <McTextLink type="success" :block="true">这是一个 成功 文字链接1</McTextLink>
    <McTextLink type="warning" :block="true">这是一个 警告 文字链接</McTextLink>
    <McTextLink type="danger" :block="true">这是一个 危险 文字链接</McTextLink>
    <McTextLink type="info" :block="true">这是一个 信息 文字链接</McTextLink>
    <McTextLink class="mc-mt-2" to="https://www.baidu.com" :block="true">点我跳转到www.baidu.com</McTextLink>
</template>

<script lang="ts" setup>
import { McTextLink } from 'meetcode-ui';
</script>
