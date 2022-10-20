<markdown>
### 渲染模式

提供 3 种渲染模式 `normal`（默认）、 `text` 和 `link` ，可以将按钮渲染成不同的样式。
</markdown>

<template>
    <McSpace>
        <McButton>Normal Button</McButton>
        <McButton render="text">Text Button</McButton>
        <McButton render="link">Link Button</McButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { McSpace, McButton } from 'meetcode-ui';
</script>
