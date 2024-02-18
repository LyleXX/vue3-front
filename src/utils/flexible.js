import { computed } from 'vue';
import { PC_DEVICE_WIDTH } from '@/constants/index.js';
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH;
});

export const useRem = () => {
  const MAX_FONT_SIZE = 40;

  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html');
    let fontSize = window.innerWidth / 10;
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize;
    html.style.fontSize = fontSize + 'px';
  });
};