# Button

## Demos

::: demo CodePreview=Basic,Ghost,Dashed

### Basic

Basic

<Basic />

Transparent

<Ghost />

Dashed

<Dashed />

:::

::: demo CodePreview=Render

### Render Mode

There are three rendering modes: `normal` (default), `text` and `link` , which can render buttons into different styles.

<Render />

:::

::: demo CodePreview=Disabled

### Disabled

<Disabled />

:::

::: demo CodePreview=Icon

### Icon

Use icons within buttons.

<Icon />

:::

::: demo CodePreview=Loading

### Loading Status

Set `loading = true` to add loading status for the button.

<Loading />

:::

::: demo CodePreview=Size

### Button Size

Buttons are available in `mini` , `small` , `medium` (default) and `large` sizes.

<Size />

:::

::: demo CodePreview=Shape

### Shape

<Shape />

:::

::: demo CodePreview=Block

### Block Level Button

Set `block` to display the button as a block level.

<Block />

:::

::: demo CodePreview=Color

### Custom Color

When `type = custom` is set, the button color can be customized.

<Color />

:::

::: demo CodePreview=ButtonGroup

### Button Group

A group of buttons.

<ButtonGroup />

:::

## Props

### Button

|       名称       |                                    类型                                    |   默认值    |                                                 说明                                                 |
| :--------------: | :------------------------------------------------------------------------: | :---------: | :--------------------------------------------------------------------------------------------------: |
|       type       | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'custom'` | `'default'` |                                               按钮类型                                               |
|       size       |                 `'mini' \| 'small' \| 'medium' \| 'large'`                 | `'medium'`  |                                               按钮尺寸                                               |
|     disabled     |                                 `boolean`                                  |   `false`   |                                             是否禁用按钮                                             |
|      ghost       |                                 `boolean`                                  |   `false`   |                                               透明背景                                               |
|      dashed      |                                 `boolean`                                  |   `false`   |                                               虚线边框                                               |
|      render      |                       `'normal' \| 'text' \| 'link'`                       | `'normal'`  |                                               渲染模式                                               |
|      round       |                                 `boolean`                                  |   `false`   |                                               圆角按钮                                               |
|      circle      |                                 `boolean`                                  |   `false`   |                                               圆形按钮                                               |
|      block       |                                 `boolean`                                  |   `false`   |                                          是否显示为块级按钮                                          |
|     loading      |                                 `boolean`                                  |   `false`   |                                              加载中状态                                              |
|    icon-right    |                                 `boolean`                                  |   `false`   |                                    是否将（加载中）图标显示在右边                                    |
|      color       |                                  `string`                                  | `undefined` | 按钮背景色，支持如 `#000` 、 `rgb(0, 0, 0)` 、 `rgba(233, 233, 233, 0.5)` 、 `blue` 等合法的颜色格式 |
|    text-color    |                                  `string`                                  | `undefined` |                                       按钮字体色，支持格式如上                                       |
|   border-color   |                                  `string`                                  | `undefined` |                                       按钮边框色，支持格式如上                                       |
|    color-set     |  `{default?: string; hover?: string; active?: string; disabled?: string}`  | `undefined` |                                       按钮不同状态下的的背景色                                       |
|  text-color-set  |  `{default?: string; hover?: string; active?: string; disabled?: string}`  | `undefined` |                                       按钮不同状态下的的字体色                                       |
| border-color-set |  `{default?: string; hover?: string; active?: string; disabled?: string}`  | `undefined` |                                       按钮不同状态下的的边框色                                       |

### ButtonGroup

|   名称   |                              类型                              |   默认值    |       说明       |
| :------: | :------------------------------------------------------------: | :---------: | :--------------: |
|   type   | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` |     按钮类型     |
|   size   |           `'mini' \| 'small' \| 'medium' \| 'large'`           | `'medium'`  |     按钮尺寸     |
| disabled |                           `boolean`                            |   `false`   | 是否禁用所有按钮 |
|  ghost   |                           `boolean`                            |   `false`   |     透明背景     |
|  dashed  |                           `boolean`                            |   `false`   |     虚线边框     |
|  render  |                 `'normal' \| 'text' \| 'link'`                 | `'normal'`  |     渲染模式     |
| vertical |                           `boolean`                            |   `false`   |     纵向排列     |

## Slot

|  名称   | 参数 |    说明    |
| :-----: | :--: | :--------: |
|  icon   | `()` | 自定义图标 |
| default | `()` |  按钮内容  |

## Expose

| 名称 |     类型      |      说明       |
| :--: | :-----------: | :-------------: |
|  el  | `HTMLElement` | 按钮的 Dom 节点 |
