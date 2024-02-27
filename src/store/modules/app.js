import { ALL_CATEGORY_ITEM } from '@/constants';

export default {
  namespaced: true,
  state: () => ({
    // 当前选中的分类
    currentCategory: ALL_CATEGORY_ITEM,
    // 搜索的文本
    searchText: '',
    // 路由跳转类型
    routerType: 'none'
  }),
  mutations: {
    /**
     * 切换选中分类
     */
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory;
    },
    /**
     * 更新搜索文本
     */
    changeSearchText(state, newText) {
      state.searchText = newText;
    },
    /**
     * 修改 routerType
     */
    changeRouterType(state, newType) {
      state.routerType = newType;
    }
  }
};
