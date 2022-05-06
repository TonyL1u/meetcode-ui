const demos = import.meta.globEager('./*.vue');
const ComponentMap: Record<string, { [key: string]: any }> = {};
for (const path in demos) {
    const name = path.match(/.\/(.*).vue/)![1];
    ComponentMap[name] = demos[path].default;
}

export default ComponentMap;
