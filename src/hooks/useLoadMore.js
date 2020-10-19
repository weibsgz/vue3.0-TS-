import { useStore } from 'vuex'

import { ref, computed } from 'vue'

// 第一个参数是请求  第二个参数是总页数 第三个参数是当前页，一般从第二页开始
const useLoadMore = (actionName, totalPage, params = { currentPage: 2, pageSize: 1 }) => {

  const store = useStore();
  //需要响应式的currentPage 对象中包含响应式 必须使用计算属性返回
  const currentPage = ref(params.currentPage);
  // console.log(params)
  // const requestParams = {
  //   currentPage: currentPage.value,
  //   pageSize: params.pageSize
  // }

  const requestParams = computed(() => ({
    currentPage: currentPage.value,
    pageSize: params.pageSize
  }))

  //点击加载更多
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value).then(() => {
      currentPage.value++;
    })
  }
  //是否最后一页
  const isLastPage = computed(() => {
    return Math.ceil(totalPage / params.pageSize) < currentPage.value
  })

  return {
    currentPage,
    loadMorePage,
    isLastPage
  }


}

export default useLoadMore