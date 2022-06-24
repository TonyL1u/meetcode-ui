# Switch 开关

## 演示

::: demo CodePreview=Basic

### 基础用法

<Basic />
:::

::: demo CodePreview=CustomValue

### 自定义值

<CustomValue />
:::

::: demo CodePreview=Size

### 尺寸

<Size />
:::

::: demo CodePreview=Content

### 描述

通过 `checked-text` 和 `unchecked-text` 来添加开关的描述。

<Content />
:::

::: demo CodePreview=Icon

### 图标

<Icon />
:::

::: demo CodePreview=Loading

### 加载中

<Loading />
:::

::: demo CodePreview=Event

### 事件

没有绑定值只会触发 `on-switch` 事件。

绑定值会同时触发 `on-update:value` 和 `on-switch` 事件。

<Event />
:::

::: demo CodePreview=Square

### 方形开关

<Square />
:::

::: demo CodePreview=Color

### 自定义颜色

<Color />
:::

::: demo CodePreview=BeforeSwitch

### 切换前的回调

通过钩子函数 `on-before-switch` 来控制开关的切换行为。返回 `false` 或者一个被 `reject` 的 `Promise` 时会阻止切换。

<BeforeSwitch />
:::

## Props

|      名称       |               类型               |         默认值          |                说明                |
| :-------------: | :------------------------------: | :---------------------: | :--------------------------------: |
| (v-model)value  |  `string \| number \| boolean`   |       `undefined`       |            开关绑定的值            |
|    disabled     |            `boolean`             |         `false`         |            是否禁用开关            |
|      size       | `'small' \| 'medium' \| 'large'` |       `'medium'`        |              开关尺寸              |
|  checked-value  |  `string \| number \| boolean`   |         `true`          |             选中时的值             |
| unchecked-value |  `string \| number \| boolean`   |         `false`         |            未选中时的值            |
|  checked-text   |   `string \| () => VNodeChild`   |       `undefined`       |          选中时显示的内容          |
| unchecked-text  |   `string \| () => VNodeChild`   |       `undefined`       |         未选中时显示的内容         |
|  checked-color  |             `string`             |       `'#10b981'`       |            选中时的颜色            |
| unchecked-color |             `string`             | `'rgba(0, 0, 0, 0.25)'` |           未选中时的颜色           |
|  handler-color  |             `string`             |        `'#fff'`         |            handler 颜色            |
| text-placement  |    `'in' \| 'out' \| 'both'`     |         `'in'`          |         开关内容显示的位置         |
|     square      |            `boolean`             |         `false`         |         是否显示为方形开关         |
|     checked     |            `boolean`             |         `false`         | 未绑定值时，控制开关的初始选中状态 |
|     loading     |            `boolean`             |         `false`         |            是否显示加载            |
|    inelastic    |            `boolean`             |         `false`         |       handler 是否有弹性效果       |

## Event

|       名称       |                      类型                      |          说明          |
| :--------------: | :--------------------------------------------: | :--------------------: |
| on-update:value  | `(value: string \| number \| boolean) => void` | 绑定值，切换开关后触发 |
|    on-switch     |                  `() => void`                  |     切换开关后触发     |
| on-before-switch |                  `() => void`                  |    切换开关前的回调    |

## Slot

|      名称      | 参数 |          说明           |
| :------------: | :--: | :---------------------: |
|      icon      | `()` |      handler 图标       |
|  checked-icon  | `()` |  选中时的 handler 图标  |
| unchecked-icon | `()` | 未选中时的 handler 图标 |
|  checked-text  | `()` |    选中时显示的内容     |
| unchecked-text | `()` |   未选中时显示的内容    |
