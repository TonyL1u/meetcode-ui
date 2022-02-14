<script setup>
import Basic from '@/space/demos/DemoBasic.vue'
import Gap from '@/space/demos/DemoGap.vue'
import Vertical from '@/space/demos/DemoVertical.vue'
</script>

# Space 间隔

## 演示

::: demo codePreview=Basic

### 基础用法

<Basic />

:::

::: demo codePreview=Gap

### 间隔

<Gap />

:::

::: demo codePreview=Vertical

### 垂直

<Vertical />

:::

## Props

|    名称    |              类型               |   默认值    |     说明     |
| :--------: | :-----------------------------: | :---------: | :----------: |
|  vertical  |            `boolean`            |   `false`   | 是否垂直显示 |
|    gap     |            `number`             |    `12`     |   项目间距   |
| item-style | `string \| CSSStyleDeclaration` | `undefined` |   项目样式   |
