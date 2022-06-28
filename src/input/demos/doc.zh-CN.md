# Input 输入框

## 演示

::: demo CodePreview=Basic

### 基础用法

最简单的 `Input` 框用法。

<Basic />
:::

::: demo CodePreview=Textarea

### 文本域

通过 `min-rows` 和 `max-rows` 来控制最小和最大高度。

<Textarea />
:::

::: demo CodePreview=Placeholder

### 占位符

可以设置丰富的 `placeholder` 。

<Placeholder />
:::

::: demo CodePreview=Password

### 密码

`type` 设置为 `password` 时，可以控制密码显示的触发方式。

<Password />
:::

::: demo CodePreview=Clear

### 清除

<Clear />
:::

::: demo CodePreview=Disabled

### 禁用

<Disabled />
:::

::: demo CodePreview=Loading

### 加载中

为 `input` 框设置加载状态。

<Loading />
:::

::: demo CodePreview=WordCount

### 字数限制与统计

<WordCount />
:::

::: demo CodePreview=Addon

### 前缀 & 后缀

设置 `type = textarea` 时，仅支持 `prepend` 和 `prefix` 插槽。

<Addon />

:::

::: demo CodePreview=AutoSize

### 自适应

根据输入内容自动调整 `Input` 框大小。

<AutoSize />

:::

::: demo CodePreview=Event

### 事件

一些事件。

<Event />

:::

::: demo CodePreview=Compose

### 组合输入框

将多个 `Input` 框组合在一起，通过 `input-count` 属性（默认为 2）来控制组合个数。**绑定的值必须为数组且长度与组合个数一致**。
<Compose />

:::

::: demo CodePreview=TypingFocus

### 输入聚焦

设置 `focus-on-typing` 属性后，可以在键入时自动聚焦。

<TypingFocus />
:::

::: demo CodePreview=InputLimit

### 输入限制

通过 `input-limits` 属性可以限制输入内容。内置了几种限制类型：

`number` ：只允许输入数字。

`not-special` ：只允许输入数字和字母。

`trim` ：头尾不允许输入空格。

`not-space` ： 不允许输入空格。

可以传入正则表达式或一个函数，返回 `true` 时表示允许输入。支持同时校验多条规则。

<InputLimit />
:::
