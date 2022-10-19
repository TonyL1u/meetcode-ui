import type { PropType, ComputedRef } from 'vue';

/** @public */
export interface ProgressUpdatePayload {
    percentage: number;
    progress: number;
    time: number;
}
/** @public */
export interface ProgressProps {
    /**
     * 进度条类型
     * @defaultValue 'line'
     */
    type?: 'line' | 'circle';
    /**
     * 是否开启动画
     * @defaultValue false
     */
    animation?: boolean;
    /**
     * 是否在进度条出现后才执行动画
     * @defaultValue false
     */
    playOnVisible?: boolean;
    /**
     * 自动播放动画
     * @defaultValue false
     */
    autoplay?: boolean;
    /**
     * 循环播放动画
     * @defaultValue false
     */
    loop?: boolean;
    /**
     * 动画往返
     * @defaultValue false
     */
    alternate?: boolean;
    /**
     * 延迟(ms)执行动画
     * @defaultValue 0
     */
    delay?: number;
    /**
     * 动画开始进度百分比
     * @defaultValue 100
     */
    start?: number;
    /**
     * 动画结束进度百分比
     * @defaultValue 0
     */
    end?: number;
    /**
     * 动画持续时间(ms)
     * @defaultValue 3000
     */
    duration?: number;
    /**
     * 进度条百分比
     * @defaultValue 0
     */
    percentage?: number;
    /**
     * 指示器位置
     * @defaultValue 'outside'
     */
    indicatorPlacement?: 'inside' | 'outside';
    /**
     * 指示器颜色
     * @defaultValue undefined
     */
    indicatorColor?: string;
    /**
     * 是否显示指示器
     * @defaultValue true
     */
    showIndicator?: boolean;
    /**
     * 进度条颜色
     * @defaultValue undefined
     */
    color?: string;
    /**
     * 当 `type = 'circle'` 时有效，用于设置环形进度条的宽高(px)
     * @defaultValue 128
     */
    size?: number;
    /**
     * 当 `type = 'line'` 时有效，用于设置进度条高度(px)
     * @defaultValue 8
     */
    height?: number;
    /**
     * 当 `type = 'circle'` 时有效，用于设置环形进度条的填充宽度(px)
     * @defaultValue 8
     */
    strokeWidth?: number;
    /**
     * 进度条轨道背景色
     * @defaultValue undefined
     */
    trackColor?: string;
}
/** @public */
export interface ProgressEvents {
    /** 动画播放时触发 */
    begin: () => void;
    /** 动画暂停时触发 */
    pause: () => void;
    /** 进度条更新时触发 */
    update: (payload: ProgressUpdatePayload) => void;
    /** 动画完成时触发 */
    complete: () => void;
    /** 动画重置时触发 */
    reset: () => void;
    /** 动画重新播放时触发 */
    restart: () => void;
    /** 动画跳转时触发 */
    seek: (payload: ProgressUpdatePayload) => void;
    /** 动画循环开始时触发 */
    loopBegin: () => void;
    /** 动画循环结束时触发 */
    loopComplete: () => void;
}
/** @public */
export interface ProgressSlots {
    /** 进度条指示器 */
    indicator: {
        percentage: number;
        progress: number;
        time: number;
        duration: number;
    };
}
/** @public */
export interface ProgressExpose {
    /** 动画信息 */
    animePayload: ComputedRef<ProgressUpdatePayload>;
    /** 播放动画 */
    play: () => void;
    /** 暂停动画 */
    pause: () => void;
    /** 重新播放动画 */
    restart: () => void;
    /** 重置动画 */
    reset: () => void;
    /** 跳转至指定时间(ms) */
    seekTime: (time: number, force?: boolean) => void;
    /** 跳转至指定进度条百分比 */
    seekPercentage: (percentage: number, force?: boolean) => void;
    /** 跳转至指定动画进度百分比 */
    seekProgress: (progress: number, force?: boolean) => void;
}
/** @internal */
export const _progressProps = {
    type: {
        type: String as PropType<ProgressProps['type']>,
        default: 'line'
    },
    animation: {
        type: Boolean as PropType<ProgressProps['animation']>,
        default: false
    },
    playOnVisible: {
        type: Boolean as PropType<ProgressProps['playOnVisible']>,
        default: false
    },
    autoplay: {
        type: Boolean as PropType<ProgressProps['autoplay']>,
        default: true
    },
    loop: {
        type: Boolean as PropType<ProgressProps['loop']>,
        default: false
    },
    alternate: {
        type: Boolean as PropType<ProgressProps['alternate']>,
        default: false
    },
    delay: {
        type: Number as PropType<ProgressProps['delay']>,
        default: 0
    },
    start: {
        type: Number as PropType<ProgressProps['start']>,
        default: 0
    },
    end: {
        type: Number as PropType<ProgressProps['end']>,
        default: 100
    },
    duration: {
        type: Number as PropType<ProgressProps['duration']>,
        default: 3000
    },
    percentage: {
        type: Number as PropType<ProgressProps['duration']>,
        default: 0
    },
    indicatorPlacement: {
        type: String as PropType<ProgressProps['indicatorPlacement']>,
        default: 'outside'
    },
    indicatorColor: {
        type: String as PropType<ProgressProps['indicatorColor']>,
        default: undefined
    },
    showIndicator: {
        type: Boolean as PropType<ProgressProps['showIndicator']>,
        default: true
    },
    color: {
        type: String as PropType<ProgressProps['color']>,
        default: undefined
    },
    size: {
        type: Number as PropType<ProgressProps['size']>,
        default: 128
    },
    height: {
        type: Number as PropType<ProgressProps['height']>,
        default: 8
    },
    strokeWidth: {
        type: Number as PropType<ProgressProps['strokeWidth']>,
        default: 8
    },
    trackColor: {
        type: String as PropType<ProgressProps['trackColor']>,
        default: undefined
    }
};
