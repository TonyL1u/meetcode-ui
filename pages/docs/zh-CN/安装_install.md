# 安装

```
npm install meetcode-ui
```

## 按需引入（推荐）

```xml
<template>
    <McButton>My Button</McButton>
</template>

<script lang="ts" setup>
import { McButton } from 'meetcode-ui';
</script>
```

## 完整引入

```ts
import { createApp } from 'vue';
import meetcode from 'meetcode-ui';

const app = createApp(App);
app.use(meetcode);
```
