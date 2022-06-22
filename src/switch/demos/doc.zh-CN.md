# Switch 开关

## 演示

::: demo CodePreview=Basic

### 基础用法

<Basic />
:::

::: demo CodePreview=CustomValue

### 自定义值

<CustomValue />
:::

::: demo CodePreview=Content

### 文字描述

通过 `checked-text` 和 `unchecked-text` 来添加开关的文字描述。

<Content />
:::

::: demo CodePreview=Icon

### 图标

<Icon />
:::

::: demo CodePreview=Loading

### 加载中

<Loading />
:::

::: demo CodePreview=Event

### 事件

没有绑定值只会触发 `on-switch` 事件。

绑定值会同时触发 `on-update:value` 和 `on-switch` 事件。

<Event />
:::

::: demo CodePreview=Square

### 方形开关

<Square />
:::

::: demo CodePreview=Color

### 自定义颜色

<Color />
:::

::: demo CodePreview=BeforeSwitch

### 切换前的回调

通过钩子函数 `on-before-switch` 来控制开关的切换行为。返回 `false` 或者一个被 `reject` 的 `Promise` 时会阻止切换。

<BeforeSwitch />
:::
