<template>
  <div
    class="w-full bg-white border-b border-b-zinc-200 px-2 py-1 dark:bg-zinc-800 duration-500 dark:border-b-zinc-700"
  >
    <div class="flex items-center">
      <img
        class="h-4 cursor-pointer mr-2 guide-home"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        @click="onToHome"
      />
      <header-search-vue class="mr-1 guide-search"></header-search-vue>
      <header-theme-vue class="mr-1 guide-theme"></header-theme-vue>
      <header-my-vue class="guide-my"></header-my-vue>
    </div>
  </div>
</template>

<script setup>
import headerSearchVue from './header-search/index.vue';
import headerThemeVue from './header-theme.vue';
import headerMyVue from './header-my.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();
const onToHome = () => {
  router.push('/');
  store.commit('app/changeRouterType', 'push');
};
</script>
