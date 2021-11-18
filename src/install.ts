import type { App } from 'vue';
import * as components from './components';

const install = (app: App) => {
    Object.keys(components)
        .map(key => components[key as keyof typeof components])
        .forEach(component => {
            app.component(component.name, component);
        });
};

export default { install };
