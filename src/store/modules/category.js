import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants/index.js';
import { getCategory } from '@/api/category.js';

export default {
  namespaced: true,
  state: () => ({
    categories: CATEGORY_NOMAR_DATA
  }),
  mutations: {
    setCategories(state, categories) {
      state.categories = [ALL_CATEGORY_ITEM, ...categories];
    }
  },
  actions: {
    async useCategoryData(context) {
      const { categorys } = await getCategory();
      context.commit('setCategories', categorys);
    }
  }
};
