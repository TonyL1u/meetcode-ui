<script setup>
import Basic from '@/popover/demos/DemoBasic.vue'
import Placement from '@/popover/demos/DemoPlacement.vue'
import ModifyContentStyle from '@/popover/demos/DemoModifyContentStyle.vue'
import Event from '@/popover/demos/DemoEvent.vue'
import Offset from '@/popover/demos/DemoOffset.vue'
import Follow from '@/popover/demos/DemoFollow.vue'
import Boundary from '@/popover/demos/DemoBoundary.vue'
import Delay from '@/popover/demos/DemoDelay.vue'
</script>

# Popover 弹出框

## 演示

::: demo codePreview=Basic

### 基础用法

设置为 `manual` 时，可以通过显式传入 `x` 和 `y` 属性控制弹出框位置；如果不传，弹出框会跟随触发元素。

<Basic />
:::

::: demo codePreview=Placement

### 弹出位置

<Placement />
:::

::: demo codePreview=ModifyContentStyle

### 样式修改

可以修改弹出框的主体样式。

`with-arrow` 设为 `false` 时隐藏箭头。

`match-trigger` 设为 `true` 时，弹出框宽度等于触发元素。

<ModifyContentStyle />
:::

::: demo codePreview=Event

### 事件

<Event />
:::

::: demo codePreview=Offset

### 偏移

<Offset />
:::

::: demo codePreview=Follow

### 跟随鼠标

设置 `trigger = 'follow'` ，弹出框可以跟随鼠标指针在元素上移动。

提供 `move` 和 `click` 两种模式。

<Follow />
:::

::: demo codePreview=Boundary

### 边界检测

弹出框跟随鼠标移动时（ `move` 模式），可以限制弹出框的位置不会超出元素内容。

<Boundary />

:::

::: demo codePreview=Delay

### 延迟

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
| on-border:reached | `(value: boolean, dirs: Array<'top' \| 'right' \| 'bottom' \| 'left'>) => void` | 弹出框溢出元素时触发 |

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
