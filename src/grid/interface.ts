import type { PropType } from 'vue';

export const GridIKey = Symbol('Grid');
export const GridItemIKey = Symbol('GridItem');
export interface GridProps {
    rows?: number;
    columns?: number;
    gap?: number;
    xGap?: number;
    yGap?: number;
    autoColumns?: string | Array<string>;
    autoRows?: string | Array<string>;
    fillMode?: 'auto-fit' | 'auto-fill';
    justify?: 'start' | 'end' | 'center' | 'stretch';
    align?: 'start' | 'end' | 'center' | 'stretch';
}
export interface GridItemProps {
    x?: number;
    y?: number;
    xSize?: number;
    ySize?: number;
    itemJustify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    itemAlign?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
}

export const gridProps = {
    rows: {
        type: Number as PropType<GridProps['rows']>,
        default: 1
    },
    columns: {
        type: Number as PropType<GridProps['columns']>,
        default: 1
    },
    gap: {
        type: Number as PropType<GridProps['gap']>,
        default: 0
    },
    xGap: {
        type: Number as PropType<GridProps['xGap']>,
        default: 0
    },
    yGap: {
        type: Number as PropType<GridProps['yGap']>,
        default: 0
    },
    autoColumns: {
        type: [String, Array] as PropType<GridProps['autoColumns']>,
        default: undefined
    },
    autoRows: {
        type: [String, Array] as PropType<GridProps['autoRows']>,
        default: undefined
    },
    fillMode: {
        type: String as PropType<GridProps['fillMode']>,
        default: 'auto-fit'
    },
    justify: {
        type: String as PropType<GridProps['justify']>,
        default: undefined
    },
    align: {
        type: String as PropType<GridProps['align']>,
        default: undefined
    }
};

export const gridItemProps = {
    x: {
        type: Number as PropType<GridItemProps['x']>,
        default: undefined
    },
    y: {
        type: Number as PropType<GridItemProps['y']>,
        default: undefined
    },
    xSize: {
        type: Number as PropType<GridItemProps['xSize']>,
        default: 1
    },
    ySize: {
        type: Number as PropType<GridItemProps['ySize']>,
        default: 1
    },
    itemJustify: {
        type: String as PropType<GridItemProps['itemJustify']>,
        default: undefined
    },
    itemAlign: {
        type: String as PropType<GridItemProps['itemAlign']>,
        default: undefined
    }
};
