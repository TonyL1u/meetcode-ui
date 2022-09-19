# Progress 进度条

## 演示

+++ container

::: demo CodePreview=Basic

### 基础用法

<Basic />
:::

::: demo CodePreview=Circle

### 环形

一个圆环。

<Circle />
:::

::: demo CodePreview=Size

### 尺寸

<Size />
:::

::: demo CodePreview=Color

### 自定义颜色

换个颜色试试。

<Color />
:::

::: demo CodePreview=Indicator

### 自定义指示器

可以把指示器放在里面，或者自定义指示器内容，甚至不显示它。

<Indicator />
:::

::: demo CodePreview=Animation

### 动画

会动的进度条。

设置 `play-on-visible` ，动画会在进度条**首次出现在视窗内**时才开始执行。

<Animation />
:::

::: demo CodePreview=Countdown

### 倒计时

通过调整动画起始与结束的百分比（介于 0 到 100 之间）来实现倒计时效果。

<Countdown />

:::

::: demo CodePreview=AnimationDelay

### 延迟

可以为动画加上延迟时间。

<AnimationDelay />

:::

::: demo CodePreview=SlotData

### 插槽参数

使用进度条动画时，指示器插槽提供了以下参数：

`percentage` ：进度条填充的百分比。

`progress` ：动画执行进度。

`time` ：动画执行时间。

`duration`：动画持续时间。

<SlotData />

:::

::: demo CodePreview=AnimationControl

### 控制与事件

<AnimationControl />

:::

+++
