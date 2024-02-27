<template>
  <div class="px-1 w-full">
    <m-infinite-list
      v-model="isLoading"
      :isFinished="isFinished"
      @onLoad="getPexelsData"
    >
      <m-waterfall
        :data="pexelsList"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <item-vue :width="width" :data="item" @click="onToPins"></item-vue>
        </template>
      </m-waterfall>
    </m-infinite-list>
    <!-- 大图详情处理 -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <pins-vue v-if="isVisiblePins" :id="currentPins.id" />
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getPexelsList } from '@/api/pexels.js';
import itemVue from './item.vue';
import { isMobileTerminal } from '@/utils/flexible.js';
import { useStore } from 'vuex';
import pinsVue from '@/views/pins/components/pins.vue';
import gsap from 'gsap';
import { useEventListener } from '@vueuse/core';

const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.localtion?.translateX,
    translateY: currentPins.value.localtion?.translateY,
    opacity: 0
  });
};
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  });
};
const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    x: currentPins.value.localtion?.translateX,
    y: currentPins.value.localtion?.translateY,
    opacity: 0
  });
};

/**
 * 构建数据请求
 */
let query = {
  page: 1,
  size: 20
};
const isLoading = ref(false);
const isFinished = ref(false);

const pexelsList = ref([]);
const getPexelsData = async () => {
  if (isFinished.value) return;

  isLoading.value = true;
  if (pexelsList.value.length) {
    query.page++;
  }

  const res = await getPexelsList(query);
  if (query.page === 1) {
    pexelsList.value = res.list;
  } else {
    pexelsList.value.push(...res.list);
  }
  if (pexelsList.value.length === res.total) {
    isFinished.value = true;
  }
  isLoading.value = false;
};
getPexelsData();
const store = useStore();
/**
 * 通过此方法修改 query 请求参数，重新发起请求
 */
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery };
  // 重置状态
  isFinished.value = false;
  pexelsList.value = [];
};

/**
 * 监听 currentCategory 的变化
 */
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    // 重置请求参数
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    });
  }
);
/**
 * 监听搜索内容项的变化
 */
watch(
  () => store.getters.searchText,
  (val) => {
    // 重置请求参数
    resetQuery({
      page: 1,
      searchText: val
    });
  }
);

// 控制 pins 展示
const isVisiblePins = ref(false);
// 当前选中的 pins 属性
const currentPins = ref({});
/**
 * 进入 pins
 */
const onToPins = (item) => {
  history.pushState(null, null, `/pins/${item.id}`);
  currentPins.value = item;
  isVisiblePins.value = true;
};

/**
 * 监听浏览器后退按钮事件
 */
useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false;
});
</script>
