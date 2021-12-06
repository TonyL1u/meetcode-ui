import { mount } from '@vue/test-utils';
import { defineComponent, reactive, isReactive } from 'vue';
// import MessageEnvironment from './MessageEnvironment.vue';
// import { McMessage, MessageApiOptions, MessageOptions } from '../index';
import { responsiveTarget } from '../../_utils_/index';
import Show from './test.vue';
// The component to test
const MessageComponent = {
    template: '<p>{{ msg }}</p>',
    props: ['msg']
};

describe('myComponentA.vue', () => {
    test('renders a greeting when show is true', async () => {
        const wrapper = mount(Show);
        expect(wrapper.html()).toContain('Hello');

        await wrapper.setProps({ show: false });

        expect(wrapper.html()).not.toContain('Hello');
    });
});

// test('displays message', () => {
//     // const options = { a: 1 };
//     // const options2 = responsiveTarget(options);

//     // expect(isReactive(options2)).toBe(true);
//     // const wrapper = mount(MessageComponent, {
//     //     props: {
//     //         msg: 'Hello world'
//     //     }
//     // });

//     // // Assert the rendered text of the component
//     // expect(wrapper.text()).toContain('Hello world');
//     // const options: MessageOptions = {
//     //     type: 'info',
//     //     message: 'test',
//     //     duration: 0,
//     //     closable: true
//     // };

//     // const messageInstance = McMessage(options);

//     // expect(messageInstance).not.toBe(options);
//     // // expect(isReactive(messageInstance)).toBe(true);

//     // messageInstance.message = 'modify test';
//     // expect(options.message).toBe('test');
// });

// describe('mc-message', () => {
//     it('raw-options', () => {
//         const options: MessageOptions = {
//             type: 'info',
//             message: 'test',
//             duration: 0,
//             closable: true
//         };

//         const messageInstance = McMessage(options);

//         expect(messageInstance).not.toBe(options);
//         // expect(isReactive(messageInstance)).toBe(true);

//         messageInstance.message = 'modify test';
//         expect(options.message).toBe('test');
//         // const wrapper = mount(MessageEnvironment);
//     });
// });
