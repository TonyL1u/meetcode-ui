<script setup>
import Basic from '@/message/demos/DemoBasic.vue'
import Card from '@/message/demos/DemoCard.vue'
import Duration from '@/message/demos/DemoDuration.vue'
import DynamicOptions from '@/message/demos/DemoDynamicOptions.vue'
import Close from '@/message/demos/DemoClose.vue'
import Custom from '@/message/demos/DemoCustom.vue'
import AsyncMessage from '@/message/demos/DemoAsyncMessage.vue'
</script>

# Message 信息

## 演示

::: demo CodePreview=Basic

### 基础用法

通过内置 `Api` 生成。

<Basic />

:::

::: demo CodePreview=Card

### 卡片样式

通过 `McMessage()` 构造器生成。

<Card />

:::

::: demo CodePreview=Duration

### 持续时间

信息默认持续时间为 `3s` 。

设置 `duration = 0` 时不会关闭。

<Duration />

:::

::: demo CodePreview=DynamicOptions

### 动态配置

通过传入一个响应式变量来动态修改信息，或者直接修改信息实例。

<DynamicOptions />

:::

::: demo CodePreview=Close

### 关闭

设置 `closable = true` 或通过 `close()` 方法可以手动关闭信息。

<Close />

:::

::: demo CodePreview=Custom

### 自定义

<Custom />

:::

::: demo CodePreview=AsyncMessage

### 异步信息

`McAsyncMessage` 返回了一个 `Promise` ，可以用来创建异步信息。

<AsyncMessage />

:::

## Api

|       名称        |                                  参数                                  |        返回值        |
| :---------------: | :--------------------------------------------------------------------: | :------------------: |
|     McMessage     |                      `(options: MessageOptions)`                       |  `MessageInstance`   |
|  McMessage.text   | `(message?: string \| MessageApiOptions, options?: MessageApiOptions)` | `MessageApiInstance` |
| McMessage.success | `(message?: string \| MessageApiOptions, options?: MessageApiOptions)` | `MessageApiInstance` |
| McMessage.warning | `(message?: string \| MessageApiOptions, options?: MessageApiOptions)` | `MessageApiInstance` |
|  McMessage.info   | `(message?: string \| MessageApiOptions, options?: MessageApiOptions)` | `MessageApiInstance` |
|  McMessage.error  | `(message?: string \| MessageApiOptions, options?: MessageApiOptions)` | `MessageApiInstance` |
| McMessage.loading | `(message?: string \| MessageApiOptions, options?: MessageApiOptions)` | `MessageApiInstance` |

## Options

|    名称    |                          类型                           |   默认值    |         说明         |
| :--------: | :-----------------------------------------------------: | :---------: | :------------------: |
|    type    | `'text' \| 'success' \| 'warning' \| 'info' \| 'error'` |   `text`    |       信息类型       |
|    card    |                        `boolean`                        |   `false`   |  是否展示为卡片样式  |
|  message   |             `string \| (() => VNodeChild)`              |    `''`     |       信息内容       |
|  duration  |                        `number`                         |   `3000`    |     持续时间(ms)     |
|  closable  |                        `boolean`                        |   `false`   |      是否可关闭      |
| className  |                        `string`                         | `undefined` |       信息类名       |
|   style    |                   `string \| object`                    | `undefined` |       信息样式       |
| hoverAlive |                        `boolean`                        |   `true`    |   Hover 不关闭信息   |
|    html    |                        `string`                         | `undefined` | 内容自定义 HTML 片段 |
|    icon    |                   `() => VNodeChild`                    | `undefined` |      自定义图标      |
|   action   |                   `() => VNodeChild`                    | `undefined` |      自定义操作      |
|  onClose   |                      `() => void`                       | `undefined` |   信息关闭时的回调   |

## Methods

| 名称  |     类型     |   说明   |
| :---: | :----------: | :------: |
| close | `() => void` | 关闭信息 |
