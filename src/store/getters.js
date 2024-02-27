export default {
  categorys: (state) => state.category.categories,
  /**
   * 当前主题
   */
  themeType: (state) => state.theme.themeType,
  /**
   * category选中项
   */
  currentCategory: (state) => state.app.currentCategory,
  /**
   * category选中项下标
   */
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex(
      (item) => item.id === getters.currentCategory.id
    );
  },
  historys: (state) => state.search.historys,
  searchText: (state) => state.app.searchText,
  token: (state) => state.user.token,
  /**
   * 获取用户信息
   */
  userInfo: (state) => state.user.userInfo
};
