# Icon 图标

## 演示

+++ container

::: demo CodePreview=Basic,Color

### 基础用法

通过 `icon` 属性或者默认 `slot` 来传入一个图标。

<Basic />

<Color />

:::

::: demo CodePreview=Spin

### 旋转

<Spin />

:::

+++

## Props

| 名称  |              类型              |   默认值    |     说明     |
| :---: | :----------------------------: | :---------: | :----------: |
| icon  |          `Component`           | `undefined` |   图标组件   |
| size  |            `number`            | `undefined` |   图标尺寸   |
| color |            `string`            | `undefined` |     颜色     |
| spin  |           `boolean`            |   `false`   | 是否开启旋转 |
| speed | `'slow' \| 'normal' \| 'fast'` | `'normal'`  |   旋转速度   |
