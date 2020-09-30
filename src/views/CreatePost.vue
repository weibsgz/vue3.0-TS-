<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input rows="10" tag="textarea" type="text" placeholder="请输入文章详情" :rules="contentRules" v-model="contentVal" />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">创建</button>
      </template>
    </validate-form>
  </div>
</template>

<script >
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ValidateInput from "../components/validateInput.vue";
import ValidateForm from "../components/ValidateForm.vue";

export default defineComponent({
  name: "Login",
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const titleVal = ref("");
    const router = useRouter();
    const store = useStore();
    const titleRules = [{ type: "required", message: "文章标题不能为空" }];
    const contentVal = ref("");
    const contentRules = [{ type: "required", message: "文章详情不能为空" }];
    const onFormSubmit = (result) => {
      if (result) {
        const { columnId } = store.state.user;
        if (columnId) {
          const newPost = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            columnId,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: columnId } })
        }
      }
    };
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      onFormSubmit
    };
  }
});
</script>