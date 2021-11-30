<script setup>
import Basic from '@/tabs/demos/DemoBasic.vue'
import DefaultValue from '@/tabs/demos/DemoDefaultValue.vue'
import ValueBinding from '@/tabs/demos/DemoValueBinding.vue'
</script>

# Tabs 标签页

## 演示

::: demo codePreview=Basic

### 基础用法

<Basic />
:::

::: demo codePreview=DefaultValue

### 默认值

通过 `default-tab` 来设置默认激活（初始值）的 tab。如果没有设置，则默认激活第一个 tab。

设置了默认值之后，无法通过修改它的值来切换 tab，因为它不是双向绑定的。如果希望动态控制 tab 切换 ，请参考**值绑定**。

<DefaultValue />
:::

::: demo codePreview=ValueBinding

### 值绑定

通过 `v-model:value` 来绑定当前选中的 tab 值，实现双向绑定。

如果同时设置了 `v-model:value` 和 `default-tab`，标签页的默认值会优先使用**前者**。

<ValueBinding />
:::

## Props

### Tabs

|     名称     |                        类型                         |   默认值    |           说明           |
| :----------: | :-------------------------------------------------: | :---------: | :----------------------: |
|     type     | `'bar' \| 'line' \| 'empty' \| 'card' \| 'segment'` |   `'bar'`   |        Tabs 样式         |
| default-tab  |                 `string \| number`                  | `undefined` |      默认激活的 tab      |
|    value     |                 `string \| number`                  | `undefined` |       双向绑定的值       |
| bar-position |                   `bottom \| top`                   | `'bottom'`  | 用于设置 line bar 的位置 |

### TabPane

### Tab

## Event

### Tabs

|         名称         |                                                    类型                                                     |         说明          |
| :------------------: | :---------------------------------------------------------------------------------------------------------: | :-------------------: |
|     on-tab:click     |                                         `(value: PaneName) => void`                                         |    点击 tab 时触发    |
|    on-update:tab     |                                         `(value: PaneName) => void`                                         | 选中的 tab 改变时触发 |
| on-before-tab-switch | `(from?: PaneName, to?: PaneName) => Promise<boolean \| undefined \| void> \| boolean \| undefined \| void` | tab 切换前的勾子函数  |

## Slot

|  名称   | 参数 |      说明      |
| :-----: | :--: | :------------: |
| default | `()` | 弹出框触发元素 |
