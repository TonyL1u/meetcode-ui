import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--default-color'?: string;
        '--hover-color'?: string;
    }
}
