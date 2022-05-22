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

::: demo CodePreview=Manually

### 手动控制

<Manually />

:::

## 类型声明

```ts
export interface MenuOption {
    key?: Key;
    label?: string | (() => VNodeChild);
    icon?: () => VNodeChild;
    intent?: number;
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
