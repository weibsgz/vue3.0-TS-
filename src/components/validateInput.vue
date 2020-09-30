<template>
  <div class="validate-input-container pb3">
    <input v-if="tag !== 'textarea'" class="form-control" :class="{'is-invalid':inputRef.error}" :value="inputRef.val"
      @blur="validateInput" @input="updateValue" v-bind="$attrs">

    <textarea v-else class="form-control" :class="{'is-invalid':inputRef.error}" :value="inputRef.val" @blur="validateInput"
      @input="updateValue" v-bind="$attrs"></textarea>

    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>


<script>
import { reactive } from 'vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default {
  props: {
    rules: Array,
    modelValue: String,   //组件绑定v-model 必须这么写
    tag: {
      type: String,
      default: 'input'
    }
  },
  setup(props, { emit }) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ""
    });

    const validateInput = () => {
      if (props.rules) {
        //every 必须所有的条件都返回true 才是 true
        const allPassed = props.rules.every(rule => {
          //每个条件是否通过
          let passed = true;
          // 如果第N条错，message就是第N条错误信息
          inputRef.message = rule.message;
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '') ? true : false
              break;
            case 'email':
              passed = emailReg.test(inputRef.val) ? true : false;
              break;
            case 'custom':
              passed = rule.validator ? rule.validator() : true
              break;
            default:
              break;
          }
          return passed
        })
        //如果都通过了 就没有error
        inputRef.error = !allPassed
      }
    }

    const updateValue = (e) => {
      inputRef.val = e.target.value;
      //组件中绑定v-model的固定写法emit('update:modelValue'
      emit('update:modelValue', e.target.value)
    }

    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
}
</script>
