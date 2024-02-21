import store from '@/store';
import { watch } from 'vue';
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants';

/**
 * 监听系统主题变更
 */
let matchMedia;
const watchSystemThemeChange = () => {
  if (matchMedia) return;
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
  matchMedia.onchange = function () {
    changeTheme(THEME_SYSTEM);
  };
};

/**
 * 变更主题
 * @param {*} theme 主题的标记常量
 */
const changeTheme = (theme) => {
  let themeClassName = '';
  switch (theme) {
    case THEME_LIGHT:
      themeClassName = 'light';
      break;
    case THEME_DARK:
      themeClassName = 'dark';
      break;
    case THEME_SYSTEM:
      watchSystemThemeChange();
      themeClassName = matchMedia.matches ? 'dark' : 'light';
      break;
  }
  // 修改 html 的 class
  document.querySelector('html').className = themeClassName;
};

/**
 * 初始化主题
 */
export default () => {
  watch(() => store.getters.themeType, changeTheme, {
    // 初始执行一次
    immediate: true
  });
};
