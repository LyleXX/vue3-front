import { createApp } from 'vue';
import App from './App.vue';
import './styles/index.scss';
import router from './router';
import store from './store';
import { useRem } from '@/utils/flexible.js';
import useTheme from '@/utils/theme.js';

import 'virtual:svg-icons-register';
import mLibs from './libs';

useRem();
useTheme();

createApp(App).use(mLibs).use(router).use(store).mount('#app');
