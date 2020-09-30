<template>
  <div class="validate-form-container">
    <slot></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['form-submit'],
  setup(props, context) {
    const submitForm = () => {
      context.emit('form-submit', true)
    };
    return {
      submitForm
    }
  },

}
</script>
