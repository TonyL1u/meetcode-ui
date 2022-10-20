# Popover 弹出框

## 演示

+++ container

::: demo CodePreview=Basic

### 基础用法

设置为 `manual` 时，可以通过显式传入 `x` 和 `y` 属性控制弹出框位置；如果不传，弹出框会跟随触发元素。

<Basic />
:::

::: demo CodePreview=Placement

### 弹出位置

<Placement />
:::

::: demo CodePreview=ModifyContentStyle

### 样式修改

可以修改弹出框的主体样式。

`with-arrow` 设为 `false` 时隐藏箭头。

`match-trigger` 设为 `true` 时，弹出框宽度等于触发元素。

<ModifyContentStyle />
:::

::: demo CodePreview=Event

### 事件

<Event />
:::

::: demo CodePreview=Offset

### 偏移

<Offset />
:::

::: demo CodePreview=Follow

### 跟随鼠标

设置 `trigger = 'follow'` ，弹出框可以跟随鼠标指针在元素上移动。

提供 `move` 和 `click` 两种模式。

<Follow />
:::

::: demo CodePreview=Boundary

### 边界检测

弹出框跟随鼠标移动时（ `move` 模式），可以限制弹出框的位置不会超出元素内容。

<Boundary />

:::

::: demo CodePreview=Delay

### 延迟

<Delay />
:::

+++

## Props

| 名称 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: |
| auto-sync | `boolean` | `undefined` |  |
| content | `string \| (() => VNodeChild)` | `undefined` |  |
| destroy-when-hide | `boolean` | `undefined` |  |
| disabled | `boolean` | `undefined` |  |
| follow-mode | `PopoverFollowMode` | `undefined` |  |
| hide-delay | `number` | `undefined` |  |
| match-trigger | `boolean` | `undefined` |  |
| offset | `PopoverOffset` | `undefined` |  |
| placement | `PopoverPlacement` | `undefined` |  |
| show | `boolean` | `undefined` |  |
| show-delay | `number` | `undefined` |  |
| teleport | `boolean` | `undefined` |  |
| title | `string` | `undefined` |  |
| trigger | `PopoverTrigger` | `undefined` |  |
| with-arrow | `boolean` | `undefined` |  |
| wrap-boundary | `boolean` | `undefined` |  |
| x | `number` | `undefined` |  |
| y | `number` | `undefined` |  |
| z-index | `number` | `undefined` |  |


## Event

|       名称        |                                      类型                                       |         说明         |
| :---------------: | :-----------------------------------------------------------------------------: | :------------------: |
|      on-show      |                             `(value: true) => void`                             |      显示时触发      |
|      on-hide      |                            `(value: false) => void`                             |      隐藏时触发      |
|  on-update:show   |                           `(value: boolean) => void`                            |    状态改变时触发    |
| on-border-reached | `(value: boolean, dirs: Array<'top' \| 'right' \| 'bottom' \| 'left'>) => void` | 弹出框溢出元素时触发 |

## Slot

|  名称   | 参数 |      说明      |
| :-----: | :--: | :------------: |
| content | `()` | 弹出框主体内容 |
| default | `()` | 弹出框触发元素 |

## Expose

| 名称 | 类型 | 说明 |
| :---: | :---: | :---: |


## Events

| 名称 | 类型 | 说明 |
| :---: | :---: | :---: |

## Slots

| 名称 | 参数 | 说明 |
| :---: | :---: | :---: |

