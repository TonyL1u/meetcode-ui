<script setup>
import Demos from './en-US'
const {Basic, CustomValue, Group, GroupLayout, Max, Event, SelectAll} = Demos
</script>

@@@ meta Component=checkbox,Lang=en-US

# Checkbox

## Demos

::: demo CodePreview=Basic

### Basic

<Basic />

:::

::: demo CodePreview=CustomValue

### Custom Value

<CustomValue />

:::

::: demo CodePreview=Group

### Checkbox Group

Add check boxes through `options` or default `slot`. Support mixed use.

<Group />

:::

::: demo CodePreview=GroupLayout

### Layout

Use of layouts within checkbox group freely.

<GroupLayout />

:::

::: demo CodePreview=Max

### Maximum Optional

You can check up to 2.

<Max />

:::

::: demo CodePreview=Event

### Event

<Event />

:::

::: demo CodePreview=SelectAll

### Select All

`McCheckboxGroup` provides `SelectAll` , `clear` events and `status` attributes.

You can set a half checked icon by setting `Indeterminate`

<SelectAll />

:::

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

|      名称       |               类型               |         说明         |
| :-------------: | :------------------------------: | :------------------: |
| on-update:value | `(value: CheckboxValue) => void` | 选中的值更更新时触发 |

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

@@@
