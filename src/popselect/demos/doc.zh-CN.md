# Popselect 弹出选择

基于 `McPopover` ，使用了虚拟列表。

## 演示

```demo
Basic
Multiple
HeightLimit
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: |
| auto-close | `boolean` | `true` | 选择后自动关闭弹出框。单选默认开启，多选默认关闭 |
| auto-scroll | `boolean` | `true` | 弹出框出现后自动定位到已选择项。多选默认滚动到第 1 个已选择项 |
| item-height | `number` | `40` | 选项高度 |
| item-style | `ElementStyleSet` | `undefined` | 选项样式 |
| max-height | `number` | `300` | 弹出框的最大高度(px) |
| multiple | `boolean` | `false` | 是否多选 |
| options | `PopselectOption[]` | `undefined` | 弹出选择选项 |
| truncate | `boolean \| number` | `200` | 选项文本超度长度(px)是否截断省略 |
| use-arrow-control | `boolean` | `true` | 是否允许通过键盘上下键选择选项 |
| (v-model)value | `PopselectValue` | `undefined` | 弹出选择绑定的值 |


## Event

|      名称       |                            类型                            |        说明        |
| :-------------: | :--------------------------------------------------------: | :----------------: |
| on-update:value | `(value: PopselectValue, option: PopselectOption) => void` | 选中的值改变时触发 |
|    on-select    |             `(value: PopselectValue) => void`              | 点击下拉选项时触发 |

更多 Event 请参考 <McTextLink to="Popover#event">Popover Event</McTextLink> 。

## Slot

|  名称   | 参数 |      说明      |
| :-----: | :--: | :------------: |
| default | `()` | 弹出框触发元素 |

## Type Declarations

```ts
export type PopselectValue = string | number | Array<string | number>;

export interface PopselectOption {
    value: string | number;
    label: string | RenderFunction;
    disabled?: boolean;
}
```

## Events

| 名称 | 类型 | 说明 |
| :---: | :---: | :---: |


## Slots

| 名称 | 参数 | 说明 |
| :---: | :---: | :---: |


## Expose

| 名称 | 类型 | 说明 |
| :---: | :---: | :---: |

