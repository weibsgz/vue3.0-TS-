<template>
  <div class="home-page">
    {{bigger}}
    <button @click="ModalIsVisable = true">显示确定框</button>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <Uploader action="/upload" :beforeUpload="beforeUpload" @file-uploaded="fileUploaded"
      @file-uploaded-error="fileUploadedError" style="font-size:22px;">

      <template v-slot:loading>jia zai zhong ....................</template>
      <template v-slot:uploaded="slotProps">
        {{slotProps}}
        <img :src="slotProps.uploadedData.data.url" />
      </template>
    </Uploader>

    <column-list :list="list"></column-list>
    <button @click="loadMorePage" v-if="!isLastPage" class="btn btn-primary">加载更多</button>
    <Modal title="测试标题" :visible="ModalIsVisable" @modal-on-close="ModalIsVisable = false"
      @modal-on-confirm="ModalIsVisable = false">
      <p>测试内容</p>
    </Modal>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import ColumnList from "../components/ColumnList.vue";
import Uploader from "../components/Uploader.vue";
import Modal from "../components/Modal.vue";
import useLoadMore from "../hooks/useLoadMore";
export default defineComponent({
  name: "Home",
  components: {
    ColumnList,
    Uploader,
    Modal,
  },
  setup() {
    const ModalIsVisable = ref(false);
    const store = useStore();



    const total = computed(() => {
      return store.state.total
    })

    const { loadMorePage, isLastPage } = useLoadMore('fetchColumns', total, {
      currentPage: 2,
      pageSize: 1
    })

    onMounted(() => {
      store.dispatch("fetchColumns", { pageSize: 3 });
    });

    const list = computed(() => store.state.columns);
    const bigger = computed(() => store.getters.biggerColumnsLen);
    console.log(store.getters);

    const beforeUpload = (file) => {
      console.log("file", file);
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        alert("不是jpg格式文件");
      }
      return isJPG;
    };

    const fileUploaded = (rawData) => {
      console.log("上传图片ID", rawData.data.id);
    };
    const fileUploadedError = (err) => {
      console.log("上传失败", err);
    };

    return {
      list,
      bigger,
      beforeUpload,
      fileUploaded,
      fileUploadedError,
      ModalIsVisable,
      loadMorePage,
      isLastPage
    };
  },
});
</script>