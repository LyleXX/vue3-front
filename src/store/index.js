import { createStore } from 'vuex';
import getters from '@/store/getters.js';
import category from '@/store/modules/category.js';
import createPersistedState from 'vuex-persistedstate';
const store = createStore({
  getters,
  modules: {
    category
  },
  plugins: [
    createPersistedState({
      // 保存到 localStorage 中的 key
      key: 'imooc-front',
      // 需要保存的模块
      paths: ['category']
    })
  ]
});
export default store;
