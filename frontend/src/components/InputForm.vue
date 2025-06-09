<template>
  <div class="form-group">
    <input
      :type="type"
      class="form-control"
      v-model="inputValue"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :id="id"
    />
  </div>
</template>

<script>
export default {
  name: "InputForm",
  props: {
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    maxlength: {
      type: Number,
      default: null,
    },
    label: {
      type: String,
      default: "",
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.form-control {
  border: 1px solid #ced4da;
  border-radius: 8px;
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  outline: none;
}

.form-control:focus {
  border-color: #000000;                      
}
</style>