<template>
  <div class="login-page">
    <validateForm @form-submit="onFormSubmit" action="">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <ValidateInput placeholder="shit" v-model="emailVal" :rules="emailRules"></ValidateInput>
        组件v-model: {{emailVal}}
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <validate-input type="password" placeholder="请输入密码" :rules="passwordRules" v-model="passwordVal" />
      </div>
      <template v-slot:submit>
        <div class="btn btn-danger">提交</div>
      </template>
    </validateForm>
  </div>
</template>

<script lang="ts">
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
    const router = useRouter();
    const store = useStore();
    const emailVal = ref("");
    const emailRules = [
      { type: "required", message: "电子邮箱地址不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" }
    ];
    const passwordVal = ref("");
    const passwordRules = [{ type: "required", message: "密码不能为空" }];
    const onFormSubmit = (result: boolean) => {
      console.log("result", result);
      if (result) {
        // router.push({ name: "column", params: { id: 1 } });

        // store.commit("login");

        const payload = {
          email: emailVal.value,
          password: passwordVal.value,
          icode: "325DEE90E25A32A4"
        };

        store
          .dispatch("loginAndFetch", payload)
          .then(data => {
            console.log("login,,,", data);
            router.push("/");
          })
          .catch(e => {
            console.log(e);
          });
      }
    };

    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit
    };
  }
});
</script>