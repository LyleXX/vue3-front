import { createStore } from 'vuex';
import getters from '@/store/getters.js';
import category from '@/store/modules/category.js';
import theme from '@/store/modules/theme.js';
import app from '@/store/modules/app.js';
import search from '@/store/modules/search.js';
import user from '@/store/modules/user.js';
import createPersistedState from 'vuex-persistedstate';
const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,
    search,
    user
  },
  plugins: [
    createPersistedState({
      // 保存到 localStorage 中的 key
      key: 'imooc-front',
      // 需要保存的模块
      paths: ['category', 'theme', 'search']
    })
  ]
});
export default store;
