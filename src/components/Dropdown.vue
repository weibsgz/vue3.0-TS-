<template>
  <div class="dropdown" ref="dropDownRef">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
      {{title}}
    </a>
    <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>


<script>
import { defineComponent, ref, watch } from "vue";
import useClickOutside from "../hooks/useClickOutside.js";
export default defineComponent({
  name: "Dropdown",
  props: {
    title: {
      type: String,
      required: true
    }
  },

  setup() {
    const isOpen = ref(false);
    //ref
    const dropDownRef = ref(null);

    const isClickOut = useClickOutside(dropDownRef);
    console.log(isClickOut)

    watch(isClickOut, (newVal) => {
      console.log('isClickOut', newVal)
      if (isClickOut.value && isOpen.value) {
        isOpen.value = false;
      }
    });

    const toggleOpen = e => {
      isOpen.value = !isOpen.value;
    };

    return {
      isOpen,
      toggleOpen,
      dropDownRef
    };
  }
});
</script>