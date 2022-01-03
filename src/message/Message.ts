import { ref, computed, useSlots, renderSlot, createVNode, toRefs, VNode, VNodeChild, defineComponent } from 'vue';
import { MessageType } from './interface';
import { NIcon } from 'naive-ui';
import { AlertCircle as IconAlert, CheckmarkCircle as IconSuccess, Warning as IconWarning, InformationCircle as IconInfo, CloseCircleSharp as IconError, CloseOutline as IconClose } from '@vicons/ionicons5';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'Message'
});
