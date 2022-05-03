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

设置 `type = custom` 时，可以自定义按钮颜色。

<Color />

:::

::: demo codePreview=ButtonGroup

### 按钮组

一组按钮。

<ButtonGroup />

:::

## Props

### Button

|       名称       |                                    类型                                    |   默认值    |                                                 说明                                                 |
| :--------------: | :------------------------------------------------------------------------: | :---------: | :--------------------------------------------------------------------------------------------------: |
|       type       | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'custom'` | `'default'` |                                               按钮类型                                               |
|       size       |                 `'mini' \| 'small' \| 'medium' \| 'large'`                 | `'medium'`  |                                               按钮尺寸                                               |
|     disabled     |                                 `boolean`                                  |   `false`   |                                             是否禁用按钮                                             |
|      ghost       |                                 `boolean`                                  |   `false`   |                                               透明背景                                               |
|      dashed      |                                 `boolean`                                  |   `false`   |                                               虚线边框                                               |
|      render      |                       `'normal' \| 'text' \| 'link'`                       | `'normal'`  |                                               渲染模式                                               |
|      round       |                                 `boolean`                                  |   `false`   |                                               圆角按钮                                               |
|      circle      |                                 `boolean`                                  |   `false`   |                                               圆形按钮                                               |
|      block       |                                 `boolean`                                  |   `false`   |                                          是否显示为块级按钮                                          |
|     loading      |                                 `boolean`                                  |   `false`   |                                              加载中状态                                              |
|    icon-right    |                                 `boolean`                                  |   `false`   |                                    是否将（加载中）图标显示在右边                                    |
|      color       |                                  `string`                                  | `undefined` | 按钮背景色，支持如 `#000` 、 `rgb(0, 0, 0)` 、 `rgba(233, 233, 233, 0.5)` 、 `blue` 等合法的颜色格式 |
|    text-color    |                                  `string`                                  | `undefined` |                                       按钮字体色，支持格式如上                                       |
|   border-color   |                                  `string`                                  | `undefined` |                                       按钮边框色，支持格式如上                                       |
|    color-set     |  `{default?: string; hover?: string; active?: string; disabled?: string}`  | `undefined` |                                       按钮不同状态下的的背景色                                       |
|  text-color-set  |  `{default?: string; hover?: string; active?: string; disabled?: string}`  | `undefined` |                                       按钮不同状态下的的字体色                                       |
| border-color-set |  `{default?: string; hover?: string; active?: string; disabled?: string}`  | `undefined` |                                       按钮不同状态下的的边框色                                       |

### ButtonGroup

|   名称   |                              类型                              |   默认值    |       说明       |
| :------: | :------------------------------------------------------------: | :---------: | :--------------: |
|   type   | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` |     按钮类型     |
|   size   |           `'mini' \| 'small' \| 'medium' \| 'large'`           | `'medium'`  |     按钮尺寸     |
| disabled |                           `boolean`                            |   `false`   | 是否禁用所有按钮 |
|  ghost   |                           `boolean`                            |   `false`   |     透明背景     |
|  dashed  |                           `boolean`                            |   `false`   |     虚线边框     |
|  render  |                 `'normal' \| 'text' \| 'link'`                 | `'normal'`  |     渲染模式     |
| vertical |                           `boolean`                            |   `false`   |     纵向排列     |

## Slot

|  名称   | 参数 |    说明    |
| :-----: | :--: | :--------: |
|  icon   | `()` | 自定义图标 |
| default | `()` |  按钮内容  |

## Expose

| 名称 |     类型      |      说明       |
| :--: | :-----------: | :-------------: |
|  el  | `HTMLElement` | 按钮的 Dom 节点 |
