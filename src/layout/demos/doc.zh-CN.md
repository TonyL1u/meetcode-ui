# Layout 布局

通过布局组件的组合可以实现复杂的布局效果，但可能会写很多额外的代码。 `McLayout` 预设了几种常用布局效果，希望能帮助你少写点的代码。

## 演示

+++ container

::: demo CodePreview=Basic

### 基础用法

<Basic />

> `McLayoutHeader` 、 `McLayoutContent` 、 `McLayoutFooter` 和 `McLayoutSider` 只允许放置在 `McLayout` 中。
>
> `McLayoutHeader` 、 `McLayoutContent` 、 `McLayoutFooter` 和 `McLayoutSider` 内允许放置任何元素。
>
> `McLayout` 内只允许放置 `McLayout` 、 `McLayoutHeader` 、 `McLayoutContent` 、 `McLayoutFooter` 和 `McLayoutSider` ，且每种组件的最大数量为 1，其余组件不会被渲染。

:::

::: demo CodePreview=Border

### 边框

`McLayoutSider` 、 `McLayoutHeader` 和 `McLayoutFooter` 可以设置边框。

<Border />

:::

::: demoCodePreview=HideSider

### 隐藏侧边栏

可以控制侧边栏的隐藏行为。

<HideSider />

:::

+++
## Props

| 名称 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: |
| content-class | `ElementClassSet` | `undefined` |  |
| content-style | `ElementStyleSet` | `undefined` |  |
| fixed-footer | `boolean` | `undefined` |  |
| fixed-header | `boolean` | `undefined` |  |
| fixed-left-sider | `boolean` | `undefined` |  |
| fixed-right-sider | `boolean` | `undefined` |  |
| fixed-sider | `boolean` | `undefined` |  |
| footer-class | `ElementClassSet` | `undefined` |  |
| footer-style | `ElementStyleSet` | `undefined` |  |
| header-class | `ElementClassSet` | `undefined` |  |
| header-style | `ElementStyleSet` | `undefined` |  |
| left-sider-class | `ElementClassSet` | `undefined` |  |
| left-sider-style | `ElementStyleSet` | `undefined` |  |
| left-sider-width | `string \| number` | `undefined` |  |
| preset | `'holy' \| 'full' \| 'two-column' \| 'three-column'` | `undefined` | 预设布局 |
| right-sider-class | `ElementClassSet` | `undefined` |  |
| right-sider-style | `ElementStyleSet` | `undefined` |  |
| right-sider-width | `string \| number` | `undefined` |  |
| show-content | `boolean` | `undefined` |  |
| show-footer | `boolean` | `undefined` |  |
| show-header | `boolean` | `undefined` |  |
| show-left-sider | `boolean` | `undefined` |  |
| show-right-sider | `boolean` | `undefined` |  |
| show-sider | `boolean` | `undefined` |  |
| sider-class | `ElementClassSet` | `undefined` |  |
| sider-right | `boolean` | `false` | 侧边栏是否显示在右侧 |
| sider-style | `ElementStyleSet` | `undefined` |  |
| sider-width | `string \| number` | `100` | 侧边栏宽度(px) |


## Events

| 名称 | 类型 | 说明 |
| :---: | :---: | :---: |


## Slots

| 名称 | 参数 | 说明 |
| :---: | :---: | :---: |


## Expose

| 名称 | 类型 | 说明 |
| :---: | :---: | :---: |

