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
