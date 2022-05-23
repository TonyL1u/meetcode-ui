# Menu 菜单

## 演示

::: demo CodePreview=Basic

### 基础用法

<Basic />

:::

::: demo CodePreview=Submenu

### 子菜单

<Submenu />

:::

::: demo CodePreview=Options

### 通过选项生成

<Options />

:::

::: demo CodePreview=DefaultExpand

### 默认展开

通过 `expand-keys` 来控制子菜单的展开。

<DefaultExpand />

:::

::: demo CodePreview=Collapse

### 折叠

可以把菜单收起来，一般配合 `McLayout` 使用。

<Collapse />

:::

::: demo CodePreview=Accordion

### 手风琴菜单

`McMenu` 和 `McSubMenu` 可以设置 `unique` 属性。设置后该菜单（子菜单）下的子菜单只允许同时展开一个。

<Accordion />

:::

::: demo CodePreview=IndentControl

### 缩进

所有菜单组件均可以设置 `indent` 属性，用于控制缩进。

<IndentControl />

:::

::: demo CodePreview=Disabled

### 禁用

所有菜单组件均可以设置 `disabled` 属性。

<Disabled />

:::

::: demo CodePreview=Manually

### 手动控制

<Manually />

:::

## Props

### Menu

|         名称         |               类型               |   默认值    |              说明              |
| :------------------: | :------------------------------: | :---------: | :----------------------------: |
|    (v-model)value    |   `string \| number \| Symbol`   | `undefined` |       Menu 绑定的 key 值       |
| (v-modal)expand-keys | `(string \| number \| Symbol)[]` | `undefined` |      展开的子菜单 key 值       |
|       disabled       |            `boolean`             |   `false`   |         是否禁用菜单项         |
|        indent        |             `number`             |    `28`     |              缩进              |
|        unique        |            `boolean`             |   `false`   |  是否只允许同时展开一项子菜单  |
|      collapsed       |            `boolean`             |   `false`   |          是否收起菜单          |
|   collapsed-width    |             `number`             |    `64`     |        菜单收起时的宽度        |
| collapsed-icon-size  |             `number`             |    `20`     |     菜单收起时的 icon 大小     |
|      horizontal      |            `boolean`             |   `false`   |       是否展示为水平菜单       |
|       options        |            `boolean`             |   `false`   | 是否将（加载中）图标显示在右边 |

## 类型声明

```ts
export interface MenuOption {
    key?: Key;
    label?: string | (() => VNodeChild);
    icon?: () => VNodeChild;
    indent?: number;
    unique?: boolean;
    group?: boolean;
    children?: MenuOption[];
}
export interface MenuExposeInstance {
    el: HTMLElement;
    expand: (keys: Key | Key[], autoSelect?: boolean) => void;
    collapseAll: () => void;
}
```
