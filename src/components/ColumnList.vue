<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar && column.avatar.url" :alt="column.title" class="rounded-circle border border-light w-25 my-3">
          <h5 class="card-title">{{column.title}}</h5>
          <p class="card-text text-left">{{column.description}}</p>
          <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary">
            进入专栏
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, PropType } from "vue";

export default defineComponent({
  name: "ColumnList",
  // props: ["list"],
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = {
            url: "//img1.xcarimg.com/PicLib/s/s13447_300.jpg"
          };
          // column.avatar = require();
        }
        return column;
      });
    });
    return {
      columnList
    };
  }
});
</script>
