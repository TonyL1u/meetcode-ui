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

::: demo CodePreview=Size

### 尺寸

<Size />
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

::: demo CodePreview=InputGroup

### 输入组

组合 `Input` 框和按钮。

<InputGroup />

:::

::: demo CodePreview=Compose

### 组合输入框

将多个 `Input` 框组合在一起，通过 `input-count` 属性（默认为 2）来控制组合个数。**绑定的值必须为数组且长度与组合个数一致**。
<Compose />

:::

::: demo CodePreview=Manually

### 手动操作

动手操作起来。

<Manually />

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

::: demo CodePreview=Valid

### 输入验证

<Valid />
:::

## Props

|       名称       |                     类型                      |   默认值    |                    说明                    |
| :--------------: | :-------------------------------------------: | :---------: | :----------------------------------------: |
|  (v-model)value  |             `string \| string[]`              | `undefined` |               输入框绑定的值               |
|       type       |     `'text' \| 'password' \| 'textarea'`      |   `text`    |                 输入框类型                 |
|       size       |       `'small' \| 'medium' \| 'large'`        | `'medium'`  |                 输入框尺寸                 |
|   placeholder    |   `InputPlaceholder \| InputPlaceholder[]`    | `undefined` |                   占位符                   |
|     disabled     |                   `boolean`                   |   `false`   |                  是否禁用                  |
|     autosize     |                   `boolean`                   |   `false`   |                 自适应大小                 |
|    resizable     |                   `boolean`                   |   `false`   | `type = textarea` 时，是否允许手动调整大小 |
|    clearable     |                   `boolean`                   |   `false`   |                 是否可清空                 |
|    word-count    |                   `boolean`                   |   `false`   |                开启字数统计                |
|     loading      |                   `boolean`                   |   `false`   |                 加载中状态                 |
| password-visible | `'none' \| 'click' \| 'hover' \| 'mousedown'` |  `'click'`  |  `type = password` 时，切换密码显示的方式  |
|     min-rows     |                   `number`                    | `undefined` |              文本域的最小行数              |
|     max-rows     |                   `number`                    | `undefined` |              文本域的最大行数              |
|    max-length    |                   `number`                    | `undefined` |                最大字数限制                |
|   input-limits   |              `InputLimitRule[]`               | `undefined` |            进行输入限制时的规则            |
|     composed     |                   `boolean`                   |   `false`   |             是否使用组合输入框             |
|      count       |                   `number`                    |     `2`     |               组合输入框个数               |
|    separator     |             `string \| string[]`              | `undefined` |             组合输入框的分隔符             |

## Event

|            名称            |                         类型                          |                   说明                   |
| :------------------------: | :---------------------------------------------------: | :--------------------------------------: |
|      on-update:value       | `(value: string \| string[], index?: number) => void` |          有绑定值，修改值时触发          |
|          on-focus          |              `(index?: number) => void`               |            组件获得焦点时触发            |
|          on-blur           |              `(index?: number) => void`               |            组件失去焦点时触发            |
|         on-change          | `(value: string \| string[], index?: number) => void` |             值改变后触发触发             |
|          on-input          | `(value: string \| string[], index?: number) => void` |               修改值时触发               |
|         on-select          |       `(value: string, index?: number) => void`       |              选中文本后触发              |
|          on-clear          |                     `() => void`                      | 设置 `clearable = true` ，清空内容后触发 |
| on-password-visible-change |             `(visible: boolean) => void`              |           密码可见性改变时触发           |

## Slot

|    名称     | 参数 |   说明   |
| :---------: | :--: | :------: |
| placeholder | `()` |  占位符  |
|   prepend   | `()` | 前置内容 |
|   prefix    | `()` |   前缀   |
|   suffix    | `()` |   后缀   |
|   append    | `()` | 后置内容 |

## Expose

|        名称        |             类型             |                   说明                   |
| :----------------: | :--------------------------: | :--------------------------------------: |
|         el         |        `HTMLElement`         |          Input 组件的 Dom 节点           |
|       focus        |  `(index?: number) => void`  |                 手动聚焦                 |
|        blur        |  `(index?: number) => void`  |                 手动失焦                 |
|       select       |  `(index?: number) => void`  |             手动选中文本内容             |
| setPasswordVisible | `(visible: boolean) => void` |              设置密码可见性              |
|       resize       |         `() => void`         | 设置 `autosize` 后，手动调整至自适应大小 |

## 类型声明

```ts
export declare type InputPlaceholder = string | (() => RenderFunction);
export declare type InputLimitType = 'trim' | 'number' | 'not-special' | 'not-space';
export declare type InputLimitRule = InputLimitType | RegExp | ((value: string, event: Event) => boolean);
```
