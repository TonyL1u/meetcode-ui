# Input 输入框

## 演示

::: demo

### 基础用法

<Basic />
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

::: demo CodePreview=Addon

### 前缀 & 后缀

设置 `type = textarea` 时，仅支持 `prepend` 和 `prefix` 插槽。

<Addon />

:::

::: demo CodePreview=Loading

### 加载中

<Loading />
:::

::: demo CodePreview=TypingFocus

### 输入聚焦

设置 `focus-on-typing` 属性后，可以在键入时自动聚焦。

<TypingFocus />
:::

::: demo CodePreview=WordCount

### 字数限制与统计

<WordCount />
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