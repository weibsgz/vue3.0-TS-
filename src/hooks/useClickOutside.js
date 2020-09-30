//点击任意位置 看是否在指定元素内 （用做点任意位置收起下拉菜单）
import { ref, onMounted, onUnmounted } from "vue";
const useClickOutside = (elementRef) => {
  const isClickOutside = ref(false);
  const handleClick = (e) => {
    if (elementRef.value) {
      isClickOutside.value = (elementRef.value.contains(e.target)) ? false : true
    }
  }

  onMounted(() => {
    document.addEventListener("click", handleClick);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClick);
  });

  return isClickOutside
}

export default useClickOutside