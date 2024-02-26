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
          <item-vue :width="width" :data="item"></item-vue>
        </template>
      </m-waterfall>
    </m-infinite-list>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getPexelsList } from '@/api/pexels';
import itemVue from './item.vue';
import { isMobileTerminal } from '@/utils/flexible.js';

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
</script>
