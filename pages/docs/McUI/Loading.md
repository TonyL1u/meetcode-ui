<script setup>
import LoadingDemo1 from '../../components/McUI-demo/Loading/LoadingDemo1.vue'
import LoadingDemo2 from '../../components/McUI-demo/Loading/LoadingDemo2.vue'
import LoadingDemo3 from '../../components/McUI-demo/Loading/LoadingDemo3.vue'
import LoadingDemo4 from '../../components/McUI-demo/Loading/LoadingDemo4.vue'
import LoadingType from '../../components/McUI-demo/Loading/LoadingType.vue'
</script>

# Loading 加载

## 演示

::: demo codePreview=LoadingDemo1

### 基础用法

默认的 Loading 样式是 spin，提供 `small` 、 `medium` 和 `large` 三种大小。

<LoadingDemo1 />

:::

::: demo codePreview=LoadingDemo2

### 内容填充

<LoadingDemo2 />
:::

::: demo codePreview=LoadingDemo3

### 遮罩样式

<LoadingDemo3 />
:::

::: demo codePreview=LoadingDemo4

### 添加描述

通过设置 `description` 属性或传入具名 `slot` 来添加加载时的描述信息。

可以通过设置 `placement` 来控制 Loading 的显示位置，默认为 `top` 。

<LoadingDemo4 />
:::

## Props

|    名称     |                   类型                   |   默认值    |             说明             |
| :---------: | :--------------------------------------: | :---------: | :--------------------------: |
|    show     |                `boolean`                 |   `true`    |       是否显示 Loading       |
|    type     |  `string (详见下表“内置 Loading 样式”)`  |  `'spin'`   |      内置 Loading 样式       |
|    size     |     `'small' \| 'medium' \| 'large'`     | `'medium'`  |         Loading 大小         |
|  placement  | `'top' \| 'right' \| 'bottom' \| 'left'` |   `'top'`   | Loading 相对于描述信息的位置 |
|    color    |                 `string`                 | `'#10b981'` |         Loading 颜色         |
|  maskStyle  |                 `object`                 |    `{}`     |          遮罩层样式          |
| description |                 `string`                 | `undefined` |      Loading 的描述信息      |

## Slot

|    名称     | 参数 |        说明        |
| :---------: | :--: | :----------------: |
|   default   | `()` | Loading 的填充内容 |
| description | `()` | Loading 的描述信息 |

## 内置 Loading 样式

|     值     |             效果              |
| :--------: | :---------------------------: |
|  `'spin'`  |        <LoadingType />        |
| `'ripple'` | <LoadingType type="ripple" /> |
|  `'bars'`  |  <LoadingType type="bars" />  |
|  `'arcs'`  |  <LoadingType type="arcs" />  |
|  `'dots'`  |  <LoadingType type="dots" />  |
