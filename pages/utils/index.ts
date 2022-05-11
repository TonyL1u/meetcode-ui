export * from './useRouterEventHook';

export function upperFirstLetter(str: string = '') {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

export function lowerFirstLetter(str: string = '') {
    return `${str.charAt(0).toLocaleLowerCase()}${str.slice(1)}`;
}
