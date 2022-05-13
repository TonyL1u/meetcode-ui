# Layout 布局

通过布局组件的组合可以实现复杂的布局效果，但可能会手动添加写很多额外的代码。 `McLayout` 预设了几种常用布局效果，希望能帮助你少写点的代码。

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

::: demo CodePreview=FullLayout

### 全屏布局

<FullLayout />

:::

::: demo CodePreview=TwoColumnLayout

### 两栏布局

<TwoColumnLayout />

:::

::: demo CodePreview=ThreeColumnLayout

### 三栏布局

<ThreeColumnLayout />

:::

::: demo CodePreview=HolyLayout

### 圣杯布局

<HolyLayout />

:::
