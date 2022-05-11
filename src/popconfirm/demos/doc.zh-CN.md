# Popconfirm 弹出确认

基于 `McPopover` ，弹出来的确认框。

## 演示

::: demo CodePreview=Basic

### 基础用法

<Basic />
:::

::: demo CodePreview=Icon

### 图标

<Icon />
:::

::: demo CodePreview=Action

### 操作

<Action />
:::

::: demo CodePreview=Event

### 事件

通过 `on-cancel` 和 `on-confirm` 事件来处理取消和确定按钮点击后的回调。

返回值为 `true` 时，点击按钮后不关闭弹出框，其他情况下均会关闭弹出框（`false、undefined、void`）。支持异步调用。

<Event />
:::

## Props

|       名称       |       类型       |  默认值  |                 说明                 |
| :--------------: | :--------------: | :------: | :----------------------------------: |
|     content      |     `string`     |   `''`   |              弹出框内容              |
|   cancel-text    | `string \| null` | `'取消'` | 取消按钮文字，设置为 `null` 隐藏按钮 |
|   confirm-text   | `string \| null` | `'确定'` | 确定按钮文字，设置为 `null` 隐藏按钮 |
| cancel-disabled  |    `boolean`     | `false`  |           是否禁用取消按钮           |
| confirm-disabled |    `boolean`     | `false`  |           是否禁用确定按钮           |
|    hide-icon     |    `boolean`     | `false`  |             是否隐藏图标             |

更多 Props 请参考 <McTextLink to="Popover#props">Popover Props</McTextLink> 。

## Event

|    名称    |                                     类型                                      |        说明        |
| :--------: | :---------------------------------------------------------------------------: | :----------------: |
| on-cancel  | `() => Promise<boolean \| undefined \| void> \| boolean \| undefined \| void` | 点击取消按钮的回调 |
| on-confirm | `() => Promise<boolean \| undefined \| void> \| boolean \| undefined \| void` | 点击确定按钮的回调 |

更多 Event 请参考 <McTextLink to="Popover#event">Popover Event</McTextLink> 。

## Slot

|  名称   | 参数 |      说明      |
| :-----: | :--: | :------------: |
|  icon   | `()` |   自定义图标   |
| default | `()` | 弹出框触发元素 |
| action  | `()` | 自定义操作内容 |
