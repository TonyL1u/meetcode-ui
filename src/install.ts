import type { App, DefineComponent } from 'vue';
import * as components from './components';

const NoNeedRegister = ['McMessage', 'McAsyncMessage', 'McPopup'];
const install = (app: App) => {
    (
        Object.keys(components)
            .filter(key => !NoNeedRegister.includes(key))
            .map(key => components[key as keyof typeof components]) as DefineComponent[]
    ).forEach(component => {
        app.component(component.name, component);
    });
};

export default { install };
