import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--text-link-default-color'?: string;
        '--text-link-hover-color'?: string;
    }
}
