<template>
  <div class="bg-white dark:bg-zinc-900 sticky top-0 left-0 z-10 duration-500">
    <ul
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
      ref="ulTarget"
    >
      <!-- 滑块 -->
      <li
        class="absolute dark:bg-zinc-800 h-[22px] bg-zinc-900 rounded-lg duration-200"
        :style="sliderStyle"
      ></li>

      <!-- 汉堡按钮 -->
      <li
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white shadow-l-white dark:bg-zinc-900 dark:shadow-l-zinc"
        @click="isOpenPopup = !isOpenPopup"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger" />
      </li>

      <!-- category item -->
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :ref="setItemRef"
        :class="{
          'text-zinc-100': index === currentCategoryIndex
        }"
        @click="changeCurrentCategoryIndex(index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <m-popup v-model="isOpenPopup">
      <menu-vue @onItemClick="onItemClick"></menu-vue>
    </m-popup>
  </div>
</template>

<script setup>
import menuVue from '@/views/main/components/menu/index.vue';
import { onBeforeUpdate, ref, watch } from 'vue';
import { useScroll } from '@vueuse/core';

const ulTarget = ref(null);
const sliderStyle = ref({
  width: '52px',
  transform: 'translateX(0px)'
});

const currentCategoryIndex = ref(0);
const { x: ulScrollLeft } = useScroll(ulTarget);
const changeCurrentCategoryIndex = (index) => {
  currentCategoryIndex.value = index;
};

let itemRefs = [];
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el);
  }
};
onBeforeUpdate(() => {
  itemRefs = [];
});
watch(currentCategoryIndex, (val) => {
  const { left, width } = itemRefs[val].getBoundingClientRect();
  sliderStyle.value = {
    width: `${width}px`,
    transform: `translateX(${ulScrollLeft.value + left - 10}px)`
  };
});

const isOpenPopup = ref(false);

// item 点击事件
const onItemClick = (index) => {
  currentCategoryIndex.value = index;
  isOpenPopup.value = false;
};
</script>

<style lang="scss" scoped></style>
