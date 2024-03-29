# Checkbox 复选框

## 演示

+++ container

::: demo CodePreview=Basic

### 基础用法

<Basic />

:::

::: demo CodePreview=CustomValue

### 自定义值

<CustomValue />

:::

::: demo CodePreview=Group

### 选项组

通过 `options` 或默认 `slot` 来添加复选框。支持混合使用。

<Group />

:::

::: demo CodePreview=GroupLayout

### 布局

在选项组内灵活使用布局。

<GroupLayout />

:::

::: demo CodePreview=Max

### 最大可选数量

最多可以选择 2 个。

<Max />

:::

::: demo CodePreview=Event

### 事件

<Event />

:::

::: demo CodePreview=SelectAll

### 全选

`McCheckboxGroup` 提供了 `selectAll` 、 `clear` 事件和 `status` 属性。

`indeterminate` 可以设置半选图标。

<SelectAll />

:::

+++

## Props

### Checkbox

|      名称       |               类型               |   默认值    |              说明              |
| :-------------: | :------------------------------: | :---------: | :----------------------------: |
| (v-model)value  |         `CheckboxValue`          | `undefined` |       Checkbox 绑定的值        |
|      label      |             `string`             | `undefined` |             标签名             |
|      size       | `'small' \| 'medium' \| 'large'` | `'medium'`  |         Checkbox 尺寸          |
|  checked-value  |         `CheckboxValue`          |   `true`    |           选中时的值           |
| unchecked-value |         `CheckboxValue`          |   `false`   |          未选中时的值          |
|    disabled     |            `boolean`             |   `false`   |            是否禁用            |
|  indeterminate  |            `boolean`             |   `false`   | 是否使用半选图标（只控制样式） |
|  checked-color  |             `string`             | `'#10b981'` |       复选框选中时的颜色       |

### CheckboxGroup

|      名称      |          类型          |   默认值    |          说明          |
| :------------: | :--------------------: | :---------: | :--------------------: |
| (v-model)value | `Array<CheckboxValue>` | `undefined` | CheckboxGroup 绑定的值 |
|    options     | `CheckboxGroupOptions` | `undefined` |         标签名         |
|      max       |        `number`        | `undefined` |      最大可选数量      |
|    disabled    |       `boolean`        |   `false`   |     是否禁用选项组     |
| checked-color  |        `string`        | `'#10b981'` |   复选框选中时的颜色   |

## CheckboxGroup Options

|   名称   |              类型              |   默认值    |       说明        |
| :------: | :----------------------------: | :---------: | :---------------: |
|  value   |        `CheckboxValue`         | `undefined` |   Checkbox 的值   |
|  label   | `string \| (() => VNodeChild)` | `undefined` |      标签名       |
| disabled |           `boolean`            |   `false`   | 是否禁用 Checkbox |

## Event

### Checkbox

|      名称       |               类型               |        说明        |
| :-------------: | :------------------------------: | :----------------: |
| on-update:value | `(value: CheckboxValue) => void` | 选中的值更新时触发 |

### CheckboxGroup

|      名称       |                                类型                                |         说明         |
| :-------------: | :----------------------------------------------------------------: | :------------------: |
| on-update:value | `(groupValue: Array<CheckboxValue>, value: CheckboxValue) => void` | 选中的值更更新时触发 |

## Expose

### Checkbox

| 名称 |     类型      |         说明         |
| :--: | :-----------: | :------------------: |
|  el  | `HTMLElement` | Checkbox 的 Dom 节点 |

### CheckboxGroup

|   名称    |         类型          |               说明               |
| :-------: | :-------------------: | :------------------------------: |
| selectAll |     `() => void`      |          全选 Checkbox           |
|   clear   |     `() => void`      |        取消全选 Checkbox         |
|  status   | `CheckboxGroupStatus` | CheckboxGroup 内选中复选框的状态 |
|    el     |     `HTMLElement`     |    CheckboxGroup 的 Dom 节点     |
