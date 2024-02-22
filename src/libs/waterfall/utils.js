/**
 * 从itemElement中抽离出所有的imgElements
 */
export const getImgElements = (itemElement) => {
  const imgElements = [];
  itemElement.forEach((el) => {
    imgElements.push(...el.querySelectorAll('img'));
  });
  return imgElements;
};
/**
 * 生成所有图片链接数组
 */
export const getAllImg = (itemElements) => {
  return itemElements.map((imgElement) => {
    return imgElement.src;
  });
};

/**
 * 监听图片数组加载完成（通过promise)
 */

export const onCompleteImgs = (imgs) => {
  const promiseAll = [];
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      const imageObj = new Image();
      imageObj.src = img;
      imageObj.onload = () => {
        resolve({
          img,
          index
        });
      };
    });
  });
  return Promise.all(promiseAll);
};
/**
 * 返回列高对象中的最大的高度
 */
export const getMaxHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj);
  return Math.max(...columnHeightArr);
};

/**
 * 返回列高对象中最小高度
 */
export const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj);
  return Math.min(...columnHeightArr);
};

/**
 * 返回列高对象中最小高度所在的列
 */
export const getMinHeightColumn = (columnHeightObj) => {
  const minHeight = getMinHeight(columnHeightObj);
  return Object.keys(columnHeightObj).find(
    (key) => columnHeightObj[key] === minHeight
  );
};
