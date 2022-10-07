# Progress 进度条

## 演示

```demo
Basic
Circle
Size
Color
Indicator
Animation
Countdown
AnimationDelay
SlotData
AnimationControl
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: |
| alternate | `boolean` | `false` | 往返播放动画 |
| animation | `boolean` | `false` | 是否开启动画 |
| autoplay | `boolean` | `false` | 自动播放动画 |
| color | `string` | `undefined` | 进度条颜色 |
| delay | `number` | `0` | 延迟(ms)执行动画 |
| duration | `number` | `3000` | 动画持续时间(ms) |
| end | `number` | `0` | 动画结束进度百分比 |
| height | `number` | `8` | 当 `type = 'line'` 时有效，用于设置进度条高度(px) |
| indicator-color | `string` | `undefined` | 指示器颜色 |
| indicator-placement | `'inside' \| 'outside'` | `'outside'` | 指示器位置 |
| loop | `boolean` | `false` | 循环播放动画 |
| percentage | `number` | `0` | 进度条百分比 |
| play-on-visible | `boolean` | `false` | 是否在进度条出现后才执行动画 |
| show-indicator | `boolean` | `true` | 是否显示指示器 |
| size | `number` | `128` | 当 `type = 'circle'` 时有效，用于设置环形进度条的宽高(px) |
| start | `number` | `100` | 动画开始进度百分比 |
| stroke-width | `number` | `8` | 当 `type = 'circle'` 时有效，用于设置环形进度条的填充宽度(px) |
| track-color | `string` | `undefined` | 进度条轨道背景色 |
| type | `'line' \| 'circle'` | `'line'` | 进度条类型 |


## Events

| 名称 | 类型 | 说明 |
| :---: | :---: | :---: |
| on-begin | `() => void` | 动画播放时触发 |
| on-complete | `() => void` | 动画完成时触发 |
| on-loop-begin | `() => void` | 动画循环开始时触发 |
| on-loop-complete | `() => void` | 动画循环结束时触发 |
| on-pause | `() => void` | 动画暂停时触发 |
| on-reset | `() => void` | 动画重置时触发 |
| on-restart | `() => void` | 动画重新播放时触发 |
| on-seek | `(payload: ProgressUpdatePayload) => void` | 动画跳转时触发 |
| on-update | `(payload: ProgressUpdatePayload) => void` | 进度条更新时触发 |


## Slots

| 名称 | 参数 | 说明 |
| :---: | :---: | :---: |
| indicator | `({        percentage: number;        progress: number;        time: number;        duration: number;    })` | 进度条指示器 |


## Expose

| 名称 | 类型 | 说明 |
| :---: | :---: | :---: |
| animePayload | `ComputedRef<ProgressUpdatePayload>` | 动画信息 |
| pause | `() => void` | 暂停动画 |
| play | `() => void` | 播放动画 |
| reset | `() => void` | 重置动画 |
| restart | `() => void` | 重新播放动画 |
| seekPercentage | `(percentage: number, force?: boolean) => void` | 跳转至指定进度条百分比 |
| seekProgress | `(progress: number, force?: boolean) => void` | 跳转至指定动画进度百分比 |
| seekTime | `(time: number, force?: boolean) => void` | 跳转至指定时间(ms) |

