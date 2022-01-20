<script setup>
import Basic from '@/button/demos/DemoBasic.vue'
import Ghost from '@/button/demos/DemoGhost.vue'
import Dashed from '@/button/demos/DemoDashed.vue'
import Disabled from '@/button/demos/DemoDisabled.vue'
import Render from '@/button/demos/DemoRender.vue'
import Icon from '@/button/demos/DemoIcon.vue'
import Loading from '@/button/demos/DemoLoading.vue'
import Size from '@/button/demos/DemoSize.vue'
import Shape from '@/button/demos/DemoShape.vue'
import Block from '@/button/demos/DemoBlock.vue'
import Color from '@/button/demos/DemoColor.vue'
import ButtonGroup from '@/button/demos/DemoButtonGroup.vue'
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

::: demo codePreview=Render

### 渲染模式

提供 3 种渲染模式 `normal`（默认）、 `text` 和 `link` ，可以将按钮渲染成不同的样式。

<Render />

:::

::: demo codePreview=Disabled

### 禁用

<Disabled />

:::

::: demo codePreview=Icon

### 图标

在按钮内使用图标。

<Icon />

:::

::: demo codePreview=Loading

### 加载中

设置 `loading = true` 为按钮添加加载状态。

<Loading />

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

::: demo codePreview=Color

### 自定义颜色

设置 `type = custom` 时，可以自定义按钮颜色。 `color-set` 属性可以修改按钮在不同状态下的颜色。

<Color />

:::

::: demo codePreview=ButtonGroup

### 按钮组

<ButtonGroup />

:::
