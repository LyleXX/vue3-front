import { createApp } from 'vue';
import App from './App.vue';
import './styles/index.scss';
import router from './router';
import store from './store';
import directives from '@/directives/index.js';
import { useRem } from '@/utils/flexible.js';
import useTheme from '@/utils/theme.js';
import './permission.js';
import 'virtual:svg-icons-register';
import mLibs from './libs';

useRem();
useTheme();

createApp(App).use(directives).use(mLibs).use(router).use(store).mount('#app');
