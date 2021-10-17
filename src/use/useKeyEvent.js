import { onUnmounted, onMounted } from '@vue/runtime-core';

/**
 * 注册键盘事件
 */
export const useKeyboard = ({ keydownOption = {}, keyupOption = {} }) => {
  function onKeyUp(e) {
    if (typeof keyupOption === 'function') {
      keyupOption(e)
    }
    keyupOption[e.code]?.();
  }
  function onKeyDown(e) {
    if (typeof keydownOption === 'function') {
      keydownOption(e)
    }
    keydownOption[e.code]?.();
  };

  onMounted(() => {
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("keydown", onKeyDown);
  });
};