<template>
  <div>
    <!-- 内容 -->
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svg-icon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      ></m-svg-icon>
      <!-- 没有更多数据了 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        已经没有更多数据了!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

const props = defineProps({
  isFinished: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(['onLoad']);
const loading = defineModel({ required: true });
// 滚动的元素
const loadingTarget = ref(null);
// 记录当前是否在底部
const targetIsIntersecting = ref(false);
useIntersectionObserver(
  loadingTarget,
  ([{ isIntersecting }], observerElement) => {
    targetIsIntersecting.value = isIntersecting;
    emitLoad();
  }
);
/**
 * 触发load
 */
const emitLoad = () => {
  if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
    loading.value = true;
    emits('onLoad');
  }
};

/**
 * 监听loading的变化，解决数据加载完成后，首屏未铺满的问题
 */
watch(loading, (val) => {
  setTimeout(() => {
    emitLoad();
  }, 100);
});
</script>

<style lang="scss" scoped></style>
