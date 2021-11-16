<script setup>
import TabsDemo1 from '../../components/McUI-demo/Tabs/TabsDemo1.vue'
import TabsDemo2 from '../../components/McUI-demo/Tabs/TabsDemo2.vue'
import TabsDemo3 from '../../components/McUI-demo/Tabs/TabsDemo3.vue'
import TabsDemo4 from '../../components/McUI-demo/Tabs/TabsDemo4.vue'
import TabsDemo5 from '../../components/McUI-demo/Tabs/TabsDemo5.vue'
import TabsDemo6 from '../../components/McUI-demo/Tabs/TabsDemo6.vue'
</script>

# Tabs 标签页

## 演示

::: demo codePreview=TabsDemo1

### 基础用法

<TabsDemo1 />

:::

::: demo codePreview=TabsDemo2

### 默认值

通过设定 `default-value` 的值来改变默认激活的 Tab。

<TabsDemo2 />

注意： `default-value` 的值**不是双向绑定**的，即设定 `default-value` 之后，点击 tab 不会修改它的值。
如果想实现类似于双向绑定的效果，可以在提供的 `on-update:tab` 事件中手动修改 `default-value` 的值。

:::

::: demo codePreview=TabsDemo3

### 样式

目前提供四种 Tabs 样式。

<TabsDemo3 />

:::

::: demo codePreview=TabsDemo4

### 头部布局

通过设定 `inline` 和 `stretch` 来控制标签页头部布局。当 `type='segment'` 时， `stretch` 默认为 `true` 。

<TabsDemo4 />

:::

::: demo codePreview=TabsDemo5

### 切换 Tab

Tabs 提供 `on-update:tab` 事件来获取 Tab 切换之后的回调。只有当 Tab 标签切换之后才会触发。

<TabsDemo5 />
:::

::: demo codePreview=TabsDemo6

### 自定义标签页

通过传入具名 `slot` 来自定义标签页内容。此时 TabPane 的 `tab-label` 属性设置无效。

<TabsDemo6 />
:::

## Props

### Tabs props

|     名称      |                    类型                    |   默认值    |                                说明                                |
| :-----------: | :----------------------------------------: | :---------: | :----------------------------------------------------------------: |
|     type      | `'line' \| 'empty' \| 'card' \| 'segment'` |  `'line'`   |                             Tabs 样式                              |
| line-position |            `'bottom' \| 'top'`             | `'bottom'`  |            当 `type='line'` 时有效，用于设置指示器位置             |
| default-value |                  `string`                  |    `''`     |                         设置默认激活的 Tab                         |
|    inline     |                 `boolean`                  |   `false`   |                    Tabs 头部是否显示为行内样式                     |
|    stretch    |                 `boolean`                  |   `false`   | 当 `type` 不等于 `'segment'` 时有效，用于设置 Tab 的宽度是否自撑开 |
|    tab-pad    |                  `number`                  |     `0`     |                        标签之间的距离（px）                        |
| default-color |                  `string`                  |  `'#000'`   |                          标签文字默认颜色                          |
| active-color  |                  `string`                  | `'#10b981'` |                         激活标签的文字颜色                         |
| header-style  |                  `object`                  |    `{}`     |                           Tabs 头部样式                            |
| content-style |                  `object`                  |    `{}`     |                           Tabs 内容样式                            |
| on-update:tab |         `(value: string) => void`          | `undefined` |                         Tab 切换之后的回调                         |

### TabPane props

|   名称    |        类型        | 默认值 |        说明         |
| :-------: | :----------------: | :----: | :-----------------: |
| tab-label | `string \| number` |  `''`  | 显示在标签页的内容  |
|   name    | `string \| number` |  `''`  | Tab pane 对应的标识 |

## Slot

### Tabs slot

|  名称   | 参数 |   说明   |
| :-----: | :--: | :------: |
| default | `()` | 标签内容 |

### TabPane props

|  名称   | 参数 |        说明        |
| :-----: | :--: | :----------------: |
|   tab   | `()` | 显示在标签页的内容 |
| default | `()` | 标签项 Tab 的内容  |
