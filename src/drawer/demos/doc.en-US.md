# Drawer

## Demos

::: demo CodePreview=Basic

### Basic

<Basic/>

:::

::: demo CodePreview=Nesting

### Nesting

<Nesting />

:::

::: demo CodePreview=BeforeLeave

### Callback before closing

A hook function `on before leave` is provided to control the behavior of the drawer before it is closed. The input parameter has three values to distinguish the behavior of closing the drawer:

`wrapper` : Click the mask layer to close.

`close` : Click the close button in the upper right corner to close.

`shortcut` : Keyboard shortcut to close.

When the return value is `true`, the drawer will be prevented from closing. Supports asynchronous calls.

<BeforeLeave />

:::

## Props

|       名称        |                   类型                   |   默认值    |          说明          |
| :---------------: | :--------------------------------------: | :---------: | :--------------------: |
|   (v-model)show   |                `boolean`                 |   `false`   |    是否显示 Drawer     |
|       size        |            `number \| string`            |    `600`    |        抽屉大小        |
| appear-direction  | `'top' \| 'right' \| 'bottom' \| 'left'` |  `'right'`  |      抽屉打开方向      |
| wrapper-closable  |                `boolean`                 |   `true`    |  点击遮罩是否触发事件  |
|   shortcut-key    |                 `string`                 | `'Escape'`  |     抽屉关闭快捷键     |
| close-on-shortcut |                `boolean`                 |   `true`    | 是否允许快捷键关闭抽屉 |
|     closable      |                `boolean`                 |   `true`    | 是否显示右上角关闭按钮 |
|   header-style    |     `string \| CSSStyleDeclaration`      | `undefined` |      header 样式       |
|    body-style     |     `string \| CSSStyleDeclaration`      | `undefined` |       body 样式        |
|    mask-style     |     `string \| CSSStyleDeclaration`      | `undefined` |       遮罩层样式       |
|   header-class    |            `string \| Array`             | `undefined` |      header 类名       |
|    body-class     |            `string \| Array`             | `undefined` |       body 类名        |
|       title       |      `string \| (() => VNodeChild)`      | `undefined` |          标题          |
|    show-header    |                `boolean`                 |   `true`    |    是否显示 header     |
|       pure        |                `boolean`                 |   `false`   |      清除抽屉样式      |

## Event

|        名称        |                                     类型                                      |         说明         |
| :----------------: | :---------------------------------------------------------------------------: | :------------------: |
|   on-update:show   |                          `(value: boolean) => void`                           | 抽屉显示或隐藏时触发 |
|  on-wrapper-click  |                                 `() => void`                                  | 点击遮罩层的回调事件 |
| on-shortcut-stroke |                          `(keys: string[]) => void`                           | 快捷键关闭抽屉时触发 |
|   on-after-enter   |                          `(value: boolean) => void`                           |   抽屉显示后的回调   |
|   on-after-leave   |                          `(value: boolean) => void`                           |   抽屉隐藏后的回调   |
|  on-before-enter   |                          `(value: boolean) => void`                           |   抽屉显示前的回调   |
|  on-before-leave   | `() => Promise<boolean \| undefined \| void> \| boolean \| undefined \| void` |   抽屉隐藏前的回调   |

## Slot

|  名称   | 参数 |       说明       |
| :-----: | :--: | :--------------: |
| default | `()` |   抽屉主体内容   |
| header  | `()` | 抽屉 header 内容 |
