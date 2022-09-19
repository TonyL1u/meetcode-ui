# Grid 网格布局

Grid 布局是一个强大的响应式 CSS 布局系统，但其属性繁多，使用起来较为繁琐。 `McGrid` 是一个简化版的 Grid 布局系统，旨在更加高效的使用 Grid 布局。

## 演示

+++ container

::: demo CodePreview=Basic

### 基础用法

`rows` 和 `columns` 指定行数和列数。通常可以只设置 `columns` 属性。

<Basic />
:::

::: demo CodePreview=Gap

### 间隔

<Gap />
:::

::: demo CodePreview=Responsive

### 自适应

设置 `auto-columns` 或 `auto-rows` 属性，可以实现 Grid 布局内容的自适应填充，可以传入一个**字符串或数组**。

字符串传入一个合法的表示 CSS 元素尺寸的值，例如 10px、2rem、1em 等，表示布局内每个项目的尺寸，所有项目会尽可能的铺满整个布局，剩余空间不足就会**换行**；数组传入项目的最小/最大尺寸，例如 `['100px', '200px']` ，项目的尺寸会根据容器大小在最小值和最大值之间自动调整。

<Responsive />

:::

::: demo CodePreview=FillMode

### 填充模式

默认的填充模式是 `auto-fit` ，并支持 `auto-fill` 模式。_改变窗口大小来查看效果_。

<FillMode />

> `auto-fit` 和 `auto-fill` 的区别： 当数组的第二个值设置为 `'1fr'` ，且**容器宽度大于所有项目宽度的总和**时，在 `auto-fit` 模式下，项目的宽度会自动拉伸，**铺满整个容器**；在 `auto-fill` 模式下，容器会**保留空白**，以尽可能的容纳更多的项目。

:::

::: demo CodePreview=ItemControl

### 项目控制

自由调整项目在布局内的位置和大小。

<ItemControl />
:::

+++

## Props

### Grid

|     名称     |                    类型                     |   默认值    |                 说明                 |
| :----------: | :-----------------------------------------: | :---------: | :----------------------------------: |
|     rows     |                  `number`                   |     `1`     |              容器的行数              |
|   columns    |                  `number`                   |     `1`     |              容器的列数              |
|    x-gap     |                  `number`                   |     `0`     |              每列的间隔              |
|    y-gap     |                  `number`                   |     `0`     |              每行的间隔              |
|     gap      |                  `number`                   |     `0`     |  相当于同时设置 `x-gap` 和 `y-gap`   |
| auto-columns |              `string \| Array`              | `undefined` |             容器列自适应             |
|  auto-rows   |              `string \| Array`              | `undefined` |             容器行自适应             |
|   autofill   |                  `boolean`                  |   `false`   | 自适应填充模式是否设置为 `auto-fill` |
| item-justify | `'start' \| 'end' \| 'center' \| 'stretch'` | `undefined` |  为所有项目设置 `justify-self` 属性  |
|  item-align  | `'start' \| 'end' \| 'center' \| 'stretch'` | `undefined` |   为所有项目设置 `align-self` 属性   |

### GridItem

|  名称   |                                              类型                                               |   默认值    |           说明           |
| :-----: | :---------------------------------------------------------------------------------------------: | :---------: | :----------------------: |
|    x    |                                            `number`                                             | `undefined` |   项目所在列的起始位置   |
|    y    |                                            `number`                                             | `undefined` |   项目所在行的起始位置   |
| x-size  |                                            `number`                                             |     `1`     |     项目列方向的大小     |
| y-size  |                                            `number`                                             |     `1`     |     项目行方向的大小     |
| justify | `'flex-start' \| 'center' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `undefined` |  项目内容主轴的对齐方式  |
|  align  | `'flex-start' \| 'center' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `undefined` | 项目内容交叉轴的对齐方式 |
