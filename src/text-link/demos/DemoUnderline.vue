<template>
    <McTextLink underline block>这是一个一直显示下划线的文字链接</McTextLink>
    <McTextLink trigger="hover" underline block>这是一个要hover才显示下划线的文字链接</McTextLink>
</template>

<script lang="ts" setup>
import { McTextLink } from 'meetcode-ui';
</script>
