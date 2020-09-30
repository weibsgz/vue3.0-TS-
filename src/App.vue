<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <message v-if="error.message" type="error" :message="error.message"></message>
    <Loader v-if="isLoading" text="拼命加载中" background="rgba(0,0,0,.6)"></Loader>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import GlobalHeader from "./components/GlobalHeader.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./components/Loader.vue";
import Message from "./components/Message.vue";

const emailVal = ref("");

export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    Loader,
    Message
  },
  setup() {
    const store = useStore();

    const currentUser = computed(() => store.state.user);
    // console.log("currentUser", currentUser);
    const isLoading = computed(() => store.state.loading);
    const token = computed(() => store.state.token);
    const error = computed(() => store.state.error);
    console.log("token", token);

    // onMounted(() => {
    //   //如果用用户登陆了 且TOKEN有效
    //   if (!currentUser.value.isLogin && token.value) {
    //     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    //     store.dispatch("fetchCurrentUser");
    //   }
    // });

    return {
      currentUser: currentUser,
      isLoading,
      error
    };
  }
});
</script>

<style>
</style>
