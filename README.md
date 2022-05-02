# meetcode-ui

A Vue3 ui framework

## Feature

-   Vue3
-   TS support
-   Dark mode
-   ...
-   ...

## Usage

### 1. install

```
npm install meetcode-ui
```

### 2. use on demand

```xml
<template>
    <McButton>My Button</McButton>
</template>

<script setup>
import { McButton } from 'meetcode-ui'
</script>
```

### 3. import globally

```ts
import { createApp } from 'vue';
import meetcode from 'meetcode-ui';

const app = createApp(App);
app.use(meetcode);
```

## Develop

```
npm install
npm run dev
```

visit [localhost:3000](localhost:3000)
