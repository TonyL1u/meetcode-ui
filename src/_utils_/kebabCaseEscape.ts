export function kebabCaseEscape(targetObj: any) {
    if (typeof targetObj !== 'object' || !targetObj) return targetObj;
    const obj: any = {};
    for (const [key, value] of Object.entries(targetObj)) {
        if (key.indexOf('-') > -1) {
            const escapeKey = key.split('-').reduce((prev: string, cur: string) => {
                return `${prev}${cur.charAt(0).toUpperCase()}${cur.slice(1)}`;
            });
            obj[escapeKey] = value;
        } else {
            obj[key] = value;
        }
    }

    return obj;
}
