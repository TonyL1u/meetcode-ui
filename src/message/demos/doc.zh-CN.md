# Message 信息

## 演示

+++ container

::: demo CodePreview=Basic

### 基础用法

通过 `Api` 生成。

<Basic />

:::

::: demo CodePreview=Card

### 卡片样式

通过 `McMessage()` 构造器生成。

<Card />

:::

::: demo CodePreview=Close

### 关闭

设置 `closable = true` 或通过 `close()` 方法可以手动关闭信息。

<Close />

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

> 如果想修改信息类型，只能通过**修改信息实例**的方式。

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

::: demo CodePreview=UseMessage

### useMessage

使用 `useMessage()` 可以创建一个新的信息容器。

<UseMessage />

:::

::: demo CodePreview=Placement

### 位置

可以控制信息的出现位置。

<Placement />

:::

::: demo CodePreview=Max

### 限制显示数量

动态控制允许显示的信息数量。

<Max />

:::

+++

## Configuration

|      名称      |           类型            |     默认值     |            说明            |
| :------------: | :-----------------------: | :------------: | :------------------------: |
|      max       |         `number`          |   `Infinity`   | 允许同时显示的最大信息个数 |
|   placement    |    `MessagePlacement`     | `'top-center'` |          出现位置          |
|    itemGap     |         `number`          |      `8`       | 两个信息之间的间隔距离(px) |
|      card      |         `boolean`         |    `false`     |     是否展示为卡片样式     |
|    duration    |         `number`          |     `3000`     |        持续时间(ms)        |
|    closable    |         `boolean`         |    `false`     |         是否可关闭         |
| containerStyle | `string \| CSSProperties` |  `undefined`   |          容器样式          |
|   hoverAlive   |         `boolean`         |     `true`     |      Hover 不关闭信息      |

## Api

|   名称    |                                  参数                                  |        返回值         |
| :-------: | :--------------------------------------------------------------------: | :-------------------: |
| McMessage |                      `(options: MessageOptions)`                       | `ConfigurableMessage` |
|   text    | `(content?: string \| MessageApiOptions, options?: MessageApiOptions)` | `ConfigurableMessage` |
|  success  | `(content?: string \| MessageApiOptions, options?: MessageApiOptions)` | `ConfigurableMessage` |
|  warning  | `(content?: string \| MessageApiOptions, options?: MessageApiOptions)` | `ConfigurableMessage` |
|   info    | `(content?: string \| MessageApiOptions, options?: MessageApiOptions)` | `ConfigurableMessage` |
|   error   | `(content?: string \| MessageApiOptions, options?: MessageApiOptions)` | `ConfigurableMessage` |
|  loading  | `(content?: string \| MessageApiOptions, options?: MessageApiOptions)` | `ConfigurableMessage` |

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

## Type Declarations

```ts
export interface MessageOptions {
    type: MessageType;
    message?: string | (() => VNodeChild);
    className?: string;
    style?: string | CSSProperties;
    duration?: number;
    closable?: boolean;
    hoverAlive?: boolean;
    html?: string;
    card?: boolean;
    itemGap?: number;
    icon?: () => VNodeChild;
    action?: () => VNodeChild;
    onClose?: MessageCloseImpl;
}
export declare type MessageApiOptions = Partial<Omit<MessageOptions, 'type'>>;
export declare type MessagePlacement = 'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'middle-center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export interface MessageGlobalConfig {
    max?: number;
    placement?: MessagePlacement;
    duration?: number;
    itemGap?: number;
    card?: boolean;
    hoverAlive?: boolean;
    closable?: boolean;
    containerStyle?: string | CSSProperties;
}
```
