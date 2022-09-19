import useMessage from './Message';

const { McMessage, McAsyncMessage } = useMessage();
export { McMessage, McAsyncMessage, useMessage };
export type { MessageOptions, MessageApiOptions, MessageType, ConfigurableMessage, MessageGlobalConfig } from './interface';
