# Tabs

## Demos

::: demo CodePreview=Basic

### Basic

The first tab will be activated by default.

<Basic />
:::

::: demo CodePreview=TypeCard

### Card

<TypeCard />
:::

::: demo CodePreview=TypeSegment

### Segment

<TypeSegment />
:::

::: demo CodePreview=HeaderLayout

### Head Layout

<HeaderLayout />
:::

::: demo CodePreview=CustomTab

### Custom Tab Style

<CustomTab />
:::

::: demo CodePreview=OnlyHeader

### No Pane

If you don't want to show the panel, you can use `McTab` . It supports mixed use with `McTabPane`.

<OnlyHeader />
:::

::: demo CodePreview=DefaultValue

### Default Tab

通过 `default-tab` 来设置默认激活（初始值）的 tab。

设置了默认值之后，无法通过修改它的值来切换 tab，因为它不是双向绑定的。如果希望动态控制 tab 切换 ，可以设置 `v-model:value` 。

如果同时设置了 `v-model:value` 和 `default-tab`，默认值会优先使用**前者**。

<DefaultValue />
:::

::: demo CodePreview=RenderMode

### Render Mode

标签面板默认使用 `v-if` 指令渲染，每次切换 tab 后都会销毁里面的内容。如果想使用 `v-show` 指令渲染，可以设置 `preload` 或 `lazy` 属性。

`preload` ：首次加载就渲染面板内容。

`lazy` ：首次加载不渲染面板内容。

<RenderMode />
:::

::: demo CodePreview=TabSwitch

### Tab 切换

通过 `on-tab-click` 和 `on-tab-switch` 事件来获取 tab 点击/切换之后的回调。

<TabSwitch />
:::

::: demo CodePreview=BeforeTabSwitch

### Tab 切换前的回调

提供钩子函数 `on-before-tab-switch` 来控制 tab 切换前的行为。

返回 `false` 时，会阻止 tab 切换；返回 `void | undefined | true` 时允许切换。支持异步调用。

<BeforeTabSwitch />
:::

## Props

### Tabs

|     名称      |                   类型                    |   默认值    |         说明         |
| :-----------: | :---------------------------------------: | :---------: | :------------------: |
|     type      | `'bar' \| 'empty' \| 'card' \| 'segment'` |   `'bar'`   |      Tabs 样式       |
|  default-tab  |            `string \| number`             | `undefined` |    默认激活的 tab    |
|     value     |            `string \| number`             | `undefined` |     双向绑定的值     |
|    center     |                 `boolean`                 |   `false`   |       标签居中       |
|    stretch    |                 `boolean`                 |   `false`   |   标签宽度自动撑开   |
| bar-position  |              `bottom \| top`              | `'bottom'`  |   设置 bar 的位置    |
|   show-line   |                 `boolean`                 |   `true`    |     是否显示划线     |
|    tab-gap    |                 `number`                  |    `40`     |  标签之间的距离(px)  |
|   animation   |      `'slide' \| 'scale' \| 'fade'`       |  `'slide'`  | 头部指示器的动画效果 |
| active-color  |                 `string`                  |  `#10b981`  |    标签激活的颜色    |
| header-style  |            `string \| object`             | `undefined` |       头部样式       |
| header-class  |                 `string`                  | `undefined` |       头部类名       |
| content-style |            `string \| object`             | `undefined` |       面板样式       |
| content-class |                 `string`                  | `undefined` |       面板类名       |

### TabPane

|   名称    |              类型              |   默认值    |         说明         |
| :-------: | :----------------------------: | :---------: | :------------------: |
|   name    |       `string \| number`       | `undefined` |  标签名称，唯一标识  |
| tab-label | `string \| (() => VNodeChild)` | `undefined` | 显示在标签头部的内容 |
| tab-style |      ` string \| object`       | `undefined` |       标签样式       |
| tab-class |           ` string`            | `undefined` |       标签类名       |
| disabled  |           `boolean`            |   `false`   |     是否禁用标签     |
|  preload  |           `boolean`            |   `false`   |      面板预加载      |
|   lazy    |           `boolean`            |   `false`   |     面板延迟加载     |

### Tab

|   名称   |        类型        |   默认值    |        说明        |
| :------: | :----------------: | :---------: | :----------------: |
|   name   | `string \| number` | `undefined` | 标签名称，唯一标识 |
| disabled |     `boolean`      |   `false`   |    是否禁用标签    |

## Event

### Tabs

|         名称         |                                                            类型                                                             |         说明          |
| :------------------: | :-------------------------------------------------------------------------------------------------------------------------: | :-------------------: |
|     on-tab-click     |                                             `(value: string \| number) => void`                                             |    点击 tab 时触发    |
|    on-tab-switch     |                                             `(value: string \| number) => void`                                             | 选中的 tab 改变时触发 |
| on-before-tab-switch | `(from?: string \| number, to?: string \| number) => Promise<boolean \| undefined \| void> \| boolean \| undefined \| void` | tab 切换前的勾子函数  |

## Slot

### Tabs

|  名称   | 参数 |    说明    |
| :-----: | :--: | :--------: |
| default | `()` | 标签页内容 |

### TabPane

|  名称   | 参数 |         说明         |
| :-----: | :--: | :------------------: |
|   tab   | `()` | 显示在标签头部的内容 |
| default | `()` |       面板内容       |

## Expose

### Tabs

|   名称   |                类型                 |       说明        |
| :------: | :---------------------------------: | :---------------: |
|    el    |            `HTMLElement`            | 标签页的 Dom 节点 |
| switchTo | `(value: string \| number) => void` |  切换至指定 tab   |
