# Anchor 锚点

## 演示

+++ container

::: demo CodePreview=Basic

### 基础用法

<Basic />
:::

::: demo CodePreview=Offset

### 偏移

一般配合 `bound` 、 `offset-top` 和 `offset-bottom` 使用。用于控制激活 Anchor 时，项目距离屏幕顶部的距离。

<Offset />
:::

::: demo CodePreview=Event

### 事件

<Event />
:::

::: demo CodePreview=AdjustStyle

### 调整样式

<AdjustStyle />
:::

::: demo CodePreview=ScrollTo

### 滚动到

<ScrollTo />
:::

+++

## Props

|     名称      |          类型           |     默认值     |               说明               |
| :-----------: | :---------------------: | :------------: | :------------------------------: |
|    options    |    `AnchorOption[]`     |  `undefined`   |           Anchor 选项            |
|     bound     |        `number`         |      `0`       | 触发 Anchor 时距离窗口顶部的偏移 |
|  offset-top   |        `number`         |      `5`       |       激活 Anchor 的上偏移       |
| offset-bottom |        `number`         |      `5`       |       激活 Anchor 的下偏移       |
|     type      | `'background' \| 'bar'` | `'background'` |           Anchor 类型            |
|  show-track   |        `boolean`        |     `true`     | `type = 'bar'` 时，是否显示轨道  |
|  show-marker  |        `boolean`        |     `true`     | `type = 'bar'` 时，是否显示标记  |

## Event

|   名称    |           类型           |         说明         |
| :-------: | :----------------------: | :------------------: |
| on-change | `(href: string) => void` | 点击 Anchor 项时触发 |

## 类型声明

```ts
export interface AnchorOption {
    title?: string | (() => VNodeChild);
    href: string;
    children?: AnchorOption[];
}
```
