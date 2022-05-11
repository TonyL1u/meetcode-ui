import { mount } from '@vue/test-utils';
import { createVNode } from 'vue';
import { McTabs, McTabPane, McTab, TabsProps, TabPaneProps, TabProps, TabPaneName } from '../index';

const TabPaneVNode = (name: TabPaneName = 'tab1', tabLabel: string = 'Tab 1', extraProps?: TabPaneProps) => {
    return createVNode(McTabPane, { name, tabLabel, ...extraProps });
};

const TabVNode = (name: TabPaneName = 'tab1', extraProps?: TabProps) => {
    return createVNode(McTab, { name, ...extraProps });
};

const Wrapper = (props?: TabsProps & Record<string, unknown>) => {
    return mount(McTabs, {
        props,
        slots: {
            default: () => [...Array(4).keys()].map(e => TabPaneVNode(`tab${e + 1}`, `Tab ${e + 1}`))
        }
    });
};

const _mount = (template: string, data?: () => unknown, args?: Record<string, unknown>) => {
    return mount({
        components: { McTabs, McTabPane, McTab },
        template,
        data,
        ...args
    });
};

describe('mc-tabs', () => {
    it('basic', async () => {
        const wrapper = Wrapper();

        expect(wrapper.findAllComponents(McTab)).toHaveLength(4);
        expect(wrapper.findAllComponents(McTabPane)).toHaveLength(4);

        const [firstTab, secondTab] = wrapper.findAllComponents(McTab);
        expect(firstTab.classes()).toContain('mc-tabs-tab--active');

        await secondTab.trigger('click');
        expect(secondTab.classes()).toContain('mc-tabs-tab--active');
        wrapper.unmount();
    });

    it('default-tab', () => {
        const wrapper = Wrapper({ defaultTab: 'tab2' });

        const [firstTab, secondTab] = wrapper.findAllComponents(McTab);
        expect(firstTab.classes()).not.toContain('mc-tabs-tab--active');
        expect(secondTab.classes()).toContain('mc-tabs-tab--active');
        wrapper.unmount();
    });

    it('value-bind', async () => {
        const wrapper = _mount(
            `
        <McTabs v-model:value="value">
            <McTabPane name="tab1" tab-label="Tab 1">1</McTabPane>
            <McTabPane name="tab2" tab-label="Tab 2">2</McTabPane>
            <McTabPane name="tab3" tab-label="Tab 3">3</McTabPane>
            <McTabPane name="tab4" tab-label="Tab 4">4</McTabPane>
        </McTabs>
        `,
            () => {
                return {
                    value: 'tab2'
                };
            }
        );

        const [firstTab, secondTab] = wrapper.findAllComponents(McTab);
        expect(secondTab.classes()).toContain('mc-tabs-tab--active');
        expect((wrapper.vm as any).value).toBe('tab2');

        await firstTab.trigger('click');
        expect(firstTab.classes()).toContain('mc-tabs-tab--active');
        expect((wrapper.vm as any).value).toBe('tab1');
        // expect(wrapper.emitted()).toHaveProperty('')
        wrapper.unmount();
    });

    it('tab & tabPane', () => {
        const wrapper = mount(McTabs, {
            slots: {
                default: () => [TabVNode('tab1'), TabVNode('tab2'), TabVNode('tab3'), TabPaneVNode('tab4', 'Tab 4')]
            }
        });

        expect(wrapper.findAllComponents(McTab)).toHaveLength(4);
        expect(wrapper.findAllComponents(McTabPane)).toHaveLength(1);
        expect(() => wrapper.get('.mc-tab-pane')).toThrowError();
        wrapper.unmount();
    });

    it('render mode', async () => {
        const wrapper = mount(McTabs, {
            slots: {
                default: () => [TabPaneVNode('tab1', 'v-if'), TabPaneVNode('tab2', 'v-show(preload)', { preload: true }), TabPaneVNode('tab3', 'v-show(lazy)', { lazy: true })]
            }
        });
        const [firstTab, secondTab, thirdTab] = wrapper.findAllComponents(McTab);
        const [firstTabPane, secondTabPane, thirdTabPane] = wrapper.findAllComponents(McTabPane);
        expect(wrapper.findAll('.mc-tab-pane')).toHaveLength(2);

        expect(firstTabPane.html()).not.toBe('');
        expect(secondTabPane.attributes('style')).toBe('display: none;');
        expect(thirdTabPane.html()).toBe('');

        await thirdTab.trigger('click');
        expect(firstTabPane.html()).toBe('');

        await firstTab.trigger('click');
        expect(wrapper.findAll('.mc-tab-pane')).toHaveLength(3);
        expect(thirdTabPane.attributes('style')).toBe('display: none;');
        wrapper.unmount();
    });

    it('event', async () => {
        const wrapper = Wrapper();

        const [firstTab, secondTab] = wrapper.findAllComponents(McTab);
        await secondTab.trigger('click');
        await secondTab.trigger('click');

        expect(wrapper.emitted('update:value')).toHaveLength(1);
        expect(wrapper.emitted('tab-switch')).toHaveLength(1);
        expect(wrapper.emitted('tab-click')).toHaveLength(2);
        wrapper.unmount();
    });

    it('before tab switch', async () => {
        const onBeforeTabSwitch = jest.fn();
        const wrapper = Wrapper({ onBeforeTabSwitch });

        const [firstTab, secondTab] = wrapper.findAllComponents(McTab);
        await secondTab.trigger('click');
        expect(onBeforeTabSwitch).toBeCalled();
        wrapper.unmount();
    });

    it('switch to', async () => {
        const wrapper = Wrapper();

        const { switchTo } = wrapper.vm as any;
        const [firstTab, secondTab] = wrapper.findAllComponents(McTab);
        await switchTo('tab2');
        expect(secondTab.classes()).toContain('mc-tabs-tab--active');
        wrapper.unmount();
    });
});
