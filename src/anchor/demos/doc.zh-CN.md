# Anchor 锚点

## 演示

::: demo CodePreview=Basic

### 基础用法

<Basic />
:::

::: demo CodePreview=Offset

### 偏移

<Offset />
:::

::: demo CodePreview=Event

### 事件

<Event />
:::

::: demo CodePreview=AdjustStyle

### 调整样式

<AdjustStyle />
:::

::: demo CodePreview=ScrollTo

### 滚动到

<ScrollTo />
:::

## Props

|         名称         |               类型               |   默认值    |             说明             |
| :------------------: | :------------------------------: | :---------: | :--------------------------: |
|    (v-model)value    |   `string \| number \| Symbol`   | `undefined` |      Menu 绑定的 key 值      |
| (v-modal)expand-keys | `(string \| number \| Symbol)[]` | `undefined` |     展开的子菜单 key 值      |
|       disabled       |            `boolean`             |   `false`   |         是否禁用菜单         |
|        indent        |             `number`             |    `28`     |             缩进             |
|        unique        |            `boolean`             |   `false`   | 是否只允许同时展开一项子菜单 |
|      collapsed       |            `boolean`             |   `false`   |         是否收起菜单         |
|   collapsed-width    |             `number`             |    `64`     |       菜单收起时的宽度       |
| collapsed-icon-size  |             `number`             |    `20`     |    菜单收起时的 icon 大小    |
|      horizontal      |            `boolean`             |   `false`   |      是否展示为水平菜单      |
|       options        |          `MenuOption[]`          | `undefined` |       通过选项生成菜单       |

## Event

|         名称          |                       类型                       |             说明             |
| :-------------------: | :----------------------------------------------: | :--------------------------: |
|    on-update:value    |    `(key:string \| number \| Symbol) => void`    | Menu 绑定的 key 值更新时触发 |
| on-update:expand-keys | `(keys: (string \| number \| Symbol)[]) => void` |    展开的子菜单变化时触发    |

## 类型声明

```ts
export interface AnchorOption {
    title?: string | (() => VNodeChild);
    href: string;
    children?: AnchorOption[];
}
```
