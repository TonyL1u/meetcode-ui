# Popselect 弹出选择

基于 `McPopover` ，使用了虚拟列表。

## 演示

::: demo CodePreview=Basic

### 基础用法

<Basic />
:::

::: demo CodePreview=Multiple

### 多选

<Multiple />
:::

::: demo CodePreview=HeightLimit

### 高度限制

选项过多时，可以为弹出框设置一个最大高度，列表内容超出该高度时就会滚动。

<HeightLimit />
:::

## Props

|    名称     |        类型         |   默认值    |                                   说明                                    |
| :---------: | :-----------------: | :---------: | :-----------------------------------------------------------------------: |
|   options   | `PopselectOption[]` |    `[]`     |                                   选项                                    |
|  multiple   |      `boolean`      |   `false`   |                                 是否多选                                  |
| max-height  |      `number`       |    `300`    |                           弹出框的最大高度(px)                            |
| auto-close  |      `boolean`      | `undefined` |             选择后自动关闭弹出框。单选默认开启，多选默认关闭              |
| auto-scroll |      `boolean`      |   `true`    | 弹出框出现后，已选择的选项滚动到最上方。多选默认滚动到第 1 个已选择的选项 |
|  truncate   | `boolean \| number` |    `200`    |               选项文本长度是否截断省略。默认超出 200px 截断               |

更多 Props 请参考 <McTextLink to="Popover#props">Popover Props</McTextLink> 。

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
