# Modal

## Demos

::: demo CodePreview=Basic

### Basic

<Basic />

:::

::: demo CodePreview=Position

### Position

The modal is centered by default. You can control the position by setting `position` .

<Position />

:::

::: demo CodePreview=CustomStyle

### Custom Style

<CustomStyle />

:::

::: demo CodePreview=Appear

### Animation

By default, the modal will appear from the cursor when you open it.

<Appear />

:::

::: demo CodePreview=WrapperClick

### Wrapper Layer Event

通过 `on-wrapper-click` 事件来处理点击遮罩层的回调。

设置 `wrapper-closable = false` 可以关闭遮罩层的点击事件。

<WrapperClick />

:::

::: demo CodePreview=Shortcut

### Shortcut

打开模态框之后，按下键盘上的 `Esc` 键会关闭当前模态框。

设置 `shortcut-key` 可以自定义关闭模态框的快捷键，格式为 `Key1+Key2+...` 。

<Shortcut />

<McTextLink to="https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code#code_values" target="_blank" underline>键盘 Keycode 请参考。</McTextLink>

:::

::: demo CodePreview=BeforeLeave

### 关闭前的回调

提供钩子函数 `on-before-leave` 来控制 Modal 关闭前的行为。入参有 5 种值用于区分关闭模态框的行为：

`wrapper` ：点击遮罩层关闭。

`close` ：点击右上角关闭按钮关闭。

`shortcut` ：键盘快捷键关闭。

`cancel` ：点击取消按钮关闭。

`confirm` ：点击确定按钮关闭。

返回值为 `true` 时，会阻止模态框关闭。支持异步调用。

<BeforeLeave />

:::

## Props

|       名称        |              类型              |   默认值    |                 说明                 |
| :---------------: | :----------------------------: | :---------: | :----------------------------------: |
|   (v-model)show   |           `boolean`            |   `false`   |            是否显示 Modal            |
|       width       |       `number \| string`       |    `600`    |              模态框宽度              |
|      height       |       `number \| string`       | `'initial'` |              模态框高度              |
| wrapper-closable  |           `boolean`            |   `true`    |         点击遮罩是否触发事件         |
|   shortcut-key    |            `string`            | `'Escape'`  |           模态框关闭快捷键           |
| close-on-shortcut |           `boolean`            |   `true`    |       是否允许快捷键关闭模态框       |
|     closable      |           `boolean`            |   `true`    |        是否显示右上角关闭按钮        |
|   header-style    |   `string \| CSSProperties`    | `undefined` |             header 样式              |
|    body-style     |   `string \| CSSProperties`    | `undefined` |              body 样式               |
|   footer-style    |   `string \| CSSProperties`    | `undefined` |             footer 样式              |
|    mask-style     |   `string \| CSSProperties`    | `undefined` |              遮罩层样式              |
|   header-class    |       `string \| Array`        | `undefined` |             header 类名              |
|    body-class     |       `string \| Array`        | `undefined` |              body 类名               |
|   footer-class    |       `string \| Array`        | `undefined` |             footer 类名              |
|       title       | `string \| (() => VNodeChild)` | `undefined` |                 标题                 |
|    show-header    |           `boolean`            |   `true`    |           是否显示 header            |
|    show-footer    |           `boolean`            |   `true`    |           是否显示 footer            |
|    cancel-text    |        `string \| null`        |  `'取消'`   | 取消按钮文字，设置为 `null` 隐藏按钮 |
|   confirm-text    |        `string \| null`        |  `'确定'`   | 确定按钮文字，设置为 `null` 隐藏按钮 |
|       pure        |           `boolean`            |   `false`   |            清除模态框样式            |
|     position      |            `object`            | `undefined` |            模态框出现位置            |
|     animation     |      `'scale' \| 'slide'`      |  `'scale'`  |            模态框出现动画            |

## Event

|        名称        |                                                 类型                                                  |          说明          |
| :----------------: | :---------------------------------------------------------------------------------------------------: | :--------------------: |
|   on-update:show   |                                      `(value: boolean) => void`                                       | 模态框显示或隐藏时触发 |
|  on-wrapper-click  |                                             `() => void`                                              |  点击遮罩层的回调事件  |
| on-shortcut-stroke |                                      `(keys: string[]) => void`                                       | 快捷键关闭模态框时触发 |
|   on-after-enter   |                                      `(value: boolean) => void`                                       |   模态框显示后的回调   |
|   on-after-leave   |                                      `(value: boolean) => void`                                       |   模态框隐藏后的回调   |
|  on-before-enter   |                                      `(value: boolean) => void`                                       |   模态框显示前的回调   |
|  on-before-leave   | `(action: ModalCloseAction) => Promise<boolean \| undefined \| void> \| boolean \| undefined \| void` |   模态框隐藏前的回调   |
|     on-cancel      |                                      `(value: boolean) => void`                                       |   点击取消按钮的回调   |
|     on-confirm     |                                      `(value: boolean) => void`                                       |   点击确定按钮的回调   |

## Slot

|  名称   | 参数 |        说明        |
| :-----: | :--: | :----------------: |
| default | `()` |   模态框主体内容   |
| header  | `()` | 模态框 header 内容 |
| footer  | `()` | 模态框 footer 内容 |
