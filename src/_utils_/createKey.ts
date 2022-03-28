export function createKey(prefix?: string): string {
    return `${prefix ? prefix + '-' : ''}${Math.random().toString(36).slice(-8)}`;
}
