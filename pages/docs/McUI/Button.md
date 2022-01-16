<script setup>
import Basic from '@/button/demos/DemoBasic.vue'
import Ghost from '@/button/demos/DemoGhost.vue'
import Dashed from '@/button/demos/DemoDashed.vue'
import Disabled from '@/button/demos/DemoDisabled.vue'
import Render from '@/button/demos/DemoRender.vue'
import Icon from '@/button/demos/DemoIcon.vue'
import Size from '@/button/demos/DemoSize.vue'
import Shape from '@/button/demos/DemoShape.vue'
import Block from '@/button/demos/DemoBlock.vue'
</script>

# Button 按钮

## 演示

::: demo codePreview=Basic,Ghost,Dashed

### 基础用法

基础

<Basic />

透明

<Ghost />

虚线

<Dashed />

:::

::: demo codePreview=Disabled

### 禁用

<Disabled />

:::

::: demo codePreview=Render

### 渲染模式

提供 3 种渲染模式 `normal`（默认）、 `text` 和 `link` ，可以将按钮渲染成不同的样式。

<Render />

:::

::: demo codePreview=Icon

### 图标

在按钮内使用图标。

<Icon />

:::

::: demo codePreview=Size

### 尺寸

按钮有 `mini` 、 `small` 、 `medium`（默认） 和 `large` 4 种大小。

<Size />

:::

::: demo codePreview=Shape

### 形状

<Shape />

:::

::: demo codePreview=Block

### 块级按钮

设置 `block` 属性，可以将按钮显示为块级。

<Block />

:::
