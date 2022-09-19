import type { PropType, ComputedRef } from 'vue';

export interface ProgressProps {
    type?: 'line' | 'circle';
    animation?: boolean;
    playOnVisible?: boolean;
    autoplay?: boolean;
    loop?: boolean;
    alternate?: boolean;
    delay?: number;
    start?: number;
    end?: number;
    duration?: number;
    percentage?: number;
    indicatorPlacement?: 'inside' | 'outside';
    indicatorColor?: string;
    showIndicator?: boolean;
    color?: string;
    size?: number;
    height?: number;
    strokeWidth?: number;
    trackColor?: string;
}
export interface ProgressUpdatePayload {
    percentage: number;
    progress: number;
    time: number;
}
export interface ProgressExposeInstance {
    animePayload: ComputedRef<ProgressUpdatePayload>;
    play: () => void;
    pause: () => void;
    restart: () => void;
    reset: () => void;
    seekTime: (time: number, force?: boolean) => void;
    seekPercentage: (percentage: number, force?: boolean) => void;
    seekProgress: (progress: number, force?: boolean) => void;
}

export const progressProps = {
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
