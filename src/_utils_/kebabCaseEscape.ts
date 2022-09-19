/**
 * convert kebab case keyed object into camel case keyed object
 *
 * @param targetObj
 * @returns e.g. `{ 'current-count': 1 } --> { currentCount: 1 }`
 */
export function kebabCaseEscape<T>(targetObj: T | null): T | null {
    if (typeof targetObj !== 'object' || !targetObj) return targetObj;
    const obj: any = {};
    for (const [key, value] of Object.entries(targetObj)) {
        if (key.indexOf('-') > -1) {
            const escapeKey = kebabToCamel(key);
            obj[escapeKey] = value;
        } else {
            obj[key] = value;
        }
    }

    return obj;
}

/**
 * convert kebab case string into camel case.
 *
 * e.g. `hello-world --> helloWorld`
 */
export function kebabToCamel(str: string) {
    return str.split('-').reduce((prev: string, cur: string) => {
        return `${prev}${cur.charAt(0).toUpperCase()}${cur.slice(1)}`;
    });
}

/**
 * convert camel case string into kebab case.
 *
 * e.g. `helloWorld --> hello-world`
 */
export function camelToKebab(str: string) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
