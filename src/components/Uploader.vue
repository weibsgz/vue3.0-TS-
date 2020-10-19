<template>
  <div class="file-upload">
    <div class="file-uploader-container" v-bind="$attrs" @click.prevent="triggerUpload">
      <slot name="loading" v-if="fileStatus === 'loading'">正在上传。。。</slot>
      <slot name="uploaded" :uploadedData="uploadedData" v-else-if="fileStatus === 'success'">上传成功</slot>
      <slot name="default" v-else>点击上传</slot>
    </div>
    <input type="file" class="file-input d-none" ref="fileInput" @change="handleFileChanged">
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
type UploadStatus = "ready" | "loading" | "success" | "error";
export default {
  props: {
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function,
    },
  },
  //父组件中的样式 不在跟元素中继承  在你定义的 v-bind="$attrs"  的元素中继承
  inheritAttrs: false,
  emits: ["file-uploaded", "file-uploaded-error"],
  setup(props, { emit }) {
    const fileInput = ref(null);
    const fileStatus = ref<UploadStatus>("ready");
    //uploadedData 要在slot中用 暴露给父组件
    //https://v3.vuejs.org/guide/component-slots.html#scoped-slots  下边传值部分
    const uploadedData = ref(null);

    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    const handleFileChanged = (e: Event) => {
      const currentFiles = e.target as HTMLInputElement;
      if (currentFiles.files) {
        const files = Array.from(currentFiles.files);
        //beforeupload
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0]);
          console.log("result", result);
          if (!result) {
            return;
          }
        }

        console.log("here");

        fileStatus.value = "loading";
        //file类型上传需要转为formData,用append方法将文件名和文件传输
        const formData = new FormData();
        formData.append("file", files[0]);
        axios
          .post(props.action, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            fileStatus.value = "success";
            fileInput.value.value = "";
            uploadedData.value = res.data;
            emit("file-uploaded", res.data);
          })
          .catch((error) => {
            fileStatus.value = "error";
            emit("file-uploaded-error", error);
          });
      }
    };

    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChanged,
      uploadedData,
    };
  },
};
</script>

<style>
</style>