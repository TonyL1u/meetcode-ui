export function cssUnitTransform(source?: string | number) {
    return typeof source === 'number' ? `${source}px` : source;
}
