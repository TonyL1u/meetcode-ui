# Layout 布局

## 演示

::: demo CodePreview=Basic

### 基础用法

<Basic />

> `McLayoutHeader` 、 `McLayoutContent` 、 `McLayoutFooter` 和 `McLayoutSider` 只允许放置在 `McLayout` 中。
>
> `McLayoutHeader` 、 `McLayoutContent` 、 `McLayoutFooter` 和 `McLayoutSider` 内允许放置任何元素。
>
> `McLayout` 内只允许放置 `McLayout` 、 `McLayoutHeader` 、 `McLayoutContent` 、 `McLayoutFooter` 和 `McLayoutSider` ，且每种组件的最大数量为 1，其余组件不会被渲染。

:::

## 使用预设

通过布局组件的组合可以实现复杂的布局效果，但可能会手动添加写很多 css 样式。 `McLayout` 预设了几种常用布局效果，希望能帮助你少写点的代码。

::: demo CodePreview=TwoCol

### 两栏布局

<TwoCol />

:::

::: demo CodePreview=ThreeCol

### 三栏布局

<ThreeCol />
:::
