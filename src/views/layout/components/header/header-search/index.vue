<template>
  <div class="w-full">
    <m-search
      v-model="inputValue"
      @search="onSearchHandler"
      @clear="onSearchHandler"
    >
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <hint-vue
            :searchText="inputValue"
            v-show="inputValue"
            @itemClick="onSearchHandler"
          ></hint-vue>
          <history-vue
            v-show="!inputValue"
            @itemClick="onSearchHandler"
          ></history-vue>
          <theme-vue v-show="!inputValue" />
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import hintVue from './hint.vue';
import historyVue from './history.vue';
import themeVue from './theme.vue';
import { useStore } from 'vuex';

const inputValue = ref('');
const store = useStore();
// 搜索的回调事件
const onSearchHandler = (val) => {
  inputValue.value = val;
  store.commit('app/changeSearchText', val);
};
</script>
