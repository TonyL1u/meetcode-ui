import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--rows-template'?: string;
        '--columns-template'?: string;
        '--grid-gap'?: string;
        '--item-justify'?: string;
        '--item-align'?: string;

        '--column-start'?: number | string;
        '--row-start'?: number | string;
        '--column-end'?: number | string;
        '--row-end'?: number | string;
        '--justify-content'?: string;
        '--align-items'?: string;

        [index: string]: any;
    }
}
const GridIKey = Symbol('Grid');
const GridItemIKey = Symbol('GridItem');
export { GridIKey, GridItemIKey };
