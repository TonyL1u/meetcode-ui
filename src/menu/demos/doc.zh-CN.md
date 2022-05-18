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

::: demo CodePreview=DefaultExpand

### 默认展开

通过 `expand-keys` 来控制子菜单的展开。

<DefaultExpand />

:::

::: demo CodePreview=Accordion

### 手风琴菜单

`McMenu` 和 `McSubMenu` 可以设置 `unique` 属性。设置后该菜单（子菜单）下的子菜单只允许同时展开一个。

默认情况下，通过展开一个子菜单而触发同级子菜单的自动关闭时，被关闭的子菜单也会触发 `@update:expand-keys` 事件。如果不想触发这个事件请在父级设置 `submenu-auto-emit = false` 。

<Accordion />

:::

::: demo CodePreview=IndentControl

### 缩进控制

所有菜单组件均可以设置 `indent` 属性，用于控制项目缩进。

<IndentControl />

:::
