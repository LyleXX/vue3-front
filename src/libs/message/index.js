import messageComponent from './index.vue';
import { h, render } from 'vue';

export const message = (type, content, duration = 3000) => {
  /**
   * 动画结束的回调
   */
  const onDestory = () => {
    render(null, document.body);
  };

  // 1. 创建一个vnode
  const vnode = h(messageComponent, {
    type,
    content,
    duration,
    destroy: onDestory
  });
  // 2.render
  render(vnode, document.body);
};
