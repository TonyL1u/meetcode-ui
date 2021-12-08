export function createKey(prefix?: string): string {
    return `${prefix ? prefix + '_' : ''}${Math.random().toString(36).slice(-8)}`;
}
