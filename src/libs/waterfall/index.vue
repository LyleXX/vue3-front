<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{ height: containerHeight + 'px' }"
  >
    <template v-if="columnWidth && data.length">
      <div
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
      >
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
    <div v-else>loading...</div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import {
  getAllImg,
  getImgElements,
  getMaxHeight,
  getMinHeight,
  getMinHeightColumn,
  onCompleteImgs
} from '@/libs/waterfall/utils.js';

const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一标识的 key
  nodeKey: {
    type: String
  },
  // 列数
  column: {
    default: 2,
    type: Number
  },
  // 列间距
  columnSpacing: {
    default: 20,
    type: Number
  },
  // 行间距
  rowSpacing: {
    default: 20,
    type: Number
  },
  // 是否需要进行图片预读取
  picturePreReading: {
    type: Boolean,
    default: true
  }
});

// 容器的高度
const containerHeight = ref(0);
// 记录每列高度的容器
const columnHeightObj = ref({});
/**
 * 构建记录各列的高度的对象
 */
const buildColumnHeightObj = () => {
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0;
  }
};

// 容器实例
const containerTarget = ref(null);
// 容器的总宽度
const containerWidth = ref(0);
// 容器的左边距
const containerLeft = ref(0);
/**
 * 计算容器的宽度
 */
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  );
  containerLeft.value = parseFloat(paddingLeft);
  containerWidth.value =
    containerTarget.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight);
};

//列宽
const columnWidth = ref(0);
// 列间距
const columnSpacingTotal = computed(() => {
  return props.columnSpacing * (props.column - 1);
});
/**
 * 计算列宽
 */
const useColumnWidth = () => {
  useContainerWidth();
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column;
};

onMounted(() => {
  useColumnWidth();
});
/**
 * 在组件销毁时，清除所有的 _style
 */
onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style;
  });
});

// item高度集合
let itemHeights = [];
/**
 * 监听图片加载完成
 */
const waitImgComplete = () => {
  itemHeights = [];
  // 拿到所有元素
  const itemElements = [...document.querySelectorAll('.m-waterfall-item')];
  // 获取所有元素的img标签
  const imgElements = getImgElements(itemElements);
  // 获取所有img标签的图片
  const allImgs = getAllImg(imgElements);
  onCompleteImgs(allImgs).then(() => {
    itemElements.forEach((el) => {
      itemHeights.push(el.offsetHeight);
    });
    // 渲染位置
    useItemLocation();
  });
};
/**
 * 图片不需要预加载，计算item高度
 */
const useItemHeight = () => {
  itemHeights = [];
  // 拿到所有元素
  let itemElements = [...document.querySelectorAll('.m-waterfall-item')];
  itemElements.forEach((el) => {
    itemHeights.push(el.offsetHeight);
  });
  // 渲染位置
  useItemLocation();
};

/**
 * 为每个 item 生成位置属性
 */
const useItemLocation = () => {
  // 遍历数据源
  props.data.forEach((item, index) => {
    if (item._style) return;

    item._style = {};
    item._style.left = getItemLeft();
    item._style.top = getItemTop();
    // 更新列高度
    increasingHeight(index);
  });
  containerHeight.value = getMaxHeight(columnHeightObj.value);
};
/**
 * 返回下一个item的left
 */
const getItemLeft = () => {
  // 最小高度所在的列 * （列宽 + 间距）
  const column = getMinHeightColumn(columnHeightObj.value);
  return column * (columnWidth.value + props.columnSpacing);
};
/**
 * 返回下一个item的top
 */
const getItemTop = () => {
  return getMinHeight(columnHeightObj.value);
};
/**
 * 指定列高度自增
 */
const increasingHeight = (index) => {
  const column = getMinHeightColumn(columnHeightObj.value);
  columnHeightObj.value[column] += itemHeights[index] + props.rowSpacing;
};
// 触发计算
watch(
  () => props.data,
  (newVal) => {
    const resetColumnHeight = newVal.every((item) => !item._style);
    if (resetColumnHeight) {
      buildColumnHeightObj();
    }
    nextTick(() => {
      if (props.picturePreReading) {
        waitImgComplete();
      } else {
        useItemHeight();
      }
    });
  },
  {
    immediate: true,
    deep: true
  }
);

/**
 * 监听列数变化，重新构建瀑布流
 */
const reset = () => {
  // 延迟 100 毫秒，否则会导致宽度计算不正确
  setTimeout(() => {
    // 重新计算列宽
    useColumnWidth();
    // 重置所有的定位数据，因为 data 中进行了深度监听，所以该操作会触发 data 的 watch
    props.data.forEach((item) => {
      item._style = null;
    });
  }, 200);
};

/**
 * 监听列数变化
 */
watch(
  () => props.column,
  () => {
    if (props.picturePreReading) {
      // 在 picturePreReading 为 true 的前提下，需要首先为列宽滞空，列宽滞空之后，会取消瀑布流渲染
      columnWidth.value = 0;
    }
    reset();
  }
);
</script>

<style lang="scss" scoped></style>
