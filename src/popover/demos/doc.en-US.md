# Popover

## Demos

::: demo CodePreview=Basic

### Basic

When set trigger to `manual` , you can control the position of the popover by explicitly passing in the `x` and `y` value; If not, the popover will follow the trigger element.

<Basic />
:::

::: demo CodePreview=Placement

### Placement

<Placement />
:::

::: demo CodePreview=ModifyContentStyle

### Modify Content Style

The popover arrow will hide when `with-arrow` is set to `false` .

The width of the popover will equal to the trigger element when `match-trigger` is set to `true` .

<ModifyContentStyle />
:::

::: demo CodePreview=Event

### Event

<Event />
:::

::: demo CodePreview=Offset

### Offset

<Offset />
:::

::: demo CodePreview=Follow

### Follow Mouse

When set `trigger = 'follow'` , the popover can follow the mouse pointer to move over the trigger element.

There are two follow modes of `move` and `click`.

<Follow />
:::

::: demo CodePreview=Boundary

### Boundary Detection

When the popover's trigger is set to `follow` with move mode, you can restrict the position of the popover from exceeding the element content.

<Boundary />

:::

::: demo CodePreview=Delay

### Delay

<Delay />
:::

## Props

|       名称        |                                                                                 类型                                                                                 |   默认值    |                     说明                     |
| :---------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------: | :------------------------------------------: |
|      trigger      |                                                             `'hover' \| 'click' \| 'manual' \| 'follow'`                                                             |  `'hover'`  |             弹出框显示的触发方式             |
|       title       |                                                                               `string`                                                                               | `undefined` |                  弹出框标题                  |
|      content      |                                                                    `string \| (() => VNodeChild)`                                                                    | `undefined` |                  弹出框内容                  |
|     placement     | `'top' \| 'bottom' \| 'left' \| 'right' \| 'top-start' \| 'top-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end' \| 'bottom-start' \| 'bottom-end'` |   `'top'`   |                弹出框弹出位置                |
|      z-index      |                                                                               `number`                                                                               | `undefined` |          弹出框弹层的 `z-index` 值           |
| destroy-when-hide |                                                                              `boolean`                                                                               |   `true`    |    弹出框在消失之后是否直接销毁 Dom 节点     |
|       show        |                                                                              `boolean`                                                                               |   `false`   |                是否显示弹出框                |
|     disabled      |                                                                              `boolean`                                                                               |   `false`   |                是否禁用弹出框                |
|    with-arrow     |                                                                              `boolean`                                                                               |   `true`    |                 是否显示箭头                 |
|      offset       |                                                                               `object`                                                                               | `undefined` |        弹出框相对于其正常位置的偏移量        |
|   wrap-boundary   |                                                                              `boolean`                                                                               |   `false`   |             是否进行边界溢出检测             |
|    show-delay     |                                                                               `number`                                                                               |    `75`     |                 延迟显示(ms)                 |
|    hide-delay     |                                                                               `number`                                                                               |    `75`     |                 延迟隐藏(ms)                 |
|   match-trigger   |                                                                              `boolean`                                                                               |   `false`   |        将弹出框宽度设置为触发元素宽度        |
|     auto-sync     |                                                                              `boolean`                                                                               |   `true`    | 触发元素的大小/位置改变时自动同步弹出框位置  |
|    follow-mode    |                                                                         `'move' \| 'click'`                                                                          |  `'move'`   | `trigger` 设置为 `follow` 时，弹出框弹出方式 |
|         x         |                                                                               `number`                                                                               | `undefined` |            弹出框在 x 方向的位置             |
|         y         |                                                                               `number`                                                                               | `undefined` |            弹出框在 y 方向的位置             |

## Event

|       名称        |                                      类型                                       |         说明         |
| :---------------: | :-----------------------------------------------------------------------------: | :------------------: |
|      on-show      |                             `(value: true) => void`                             |      显示时触发      |
|      on-hide      |                            `(value: false) => void`                             |      隐藏时触发      |
|  on-update:show   |                           `(value: boolean) => void`                            |    状态改变时触发    |
| on-border-reached | `(value: boolean, dirs: Array<'top' \| 'right' \| 'bottom' \| 'left'>) => void` | 弹出框溢出元素时触发 |

## Slot

|  名称   | 参数 |      说明      |
| :-----: | :--: | :------------: |
| content | `()` | 弹出框主体内容 |
| default | `()` | 弹出框触发元素 |

## Expose

|     名称     |     类型      |            说明            |
| :----------: | :-----------: | :------------------------: |
| syncPosition | `() => void`  | 同步弹出框和触发元素的位置 |
|     show     | `() => void`  |         显示弹出框         |
|     hide     | `() => void`  |         隐藏弹出框         |
|      el      | `HTMLElement` |     弹出框的 Dom 节点      |
