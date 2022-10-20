<markdown>
### 块级按钮

设置 `block` 属性，可以将按钮显示为块级。
</markdown>

<template>
    <McButton class="mc-mb-3" dashed block>我是</McButton>
    <McButton class="mc-mb-3" type="primary" render="text" block>块级</McButton>
    <McButton type="success" render="link" block>按钮</McButton>
</template>

<script lang="ts" setup>
import { McButton, McSpace } from 'meetcode-ui';
</script>
