# Menu

## Demos

::: demo CodePreview=Basic

### Basic

<Basic />

:::

::: demo CodePreview=Submenu

### Submenu

<Submenu />

:::

::: demo CodePreview=Options

### Create By Options

<Options />

:::

::: demo CodePreview=DefaultExpand

### Default Expand

通过 `expand-keys` 来控制子菜单的展开。

<DefaultExpand />

:::

::: demo CodePreview=Collapse

### Collapse

可以把菜单收起来，一般配合 `McLayout` 使用。

<Collapse />

:::

::: demo CodePreview=Accordion

### Accordion

`McMenu` 和 `McSubMenu` 可以设置 `unique` 属性。设置后该菜单（子菜单）下的子菜单只允许同时展开一个。

<Accordion />

:::

::: demo CodePreview=IndentControl

### Indent

所有菜单组件均可以设置 `indent` 属性，用于控制缩进。

<IndentControl />

:::

::: demo CodePreview=Manually

### Control Manually

<Manually />

:::

## Type Declarations

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
