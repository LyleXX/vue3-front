import { createApp } from 'vue';
import App from './App.vue';
import './styles/index.scss';
import router from './router';
import { useRem } from '@/utils/flexible.js';

import 'virtual:svg-icons-register';
import mLibs from './libs';

useRem();

createApp(App).use(mLibs).use(router).mount('#app');
