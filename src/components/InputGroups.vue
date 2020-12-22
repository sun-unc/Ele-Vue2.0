<template>
  <div class="text_group">
    <!-- 组件结构 -->

    <!-- 组件容器 -->
    <div class="input_group" :class="{ isinvalid: error }">
      <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :name="name"
        @input="$emit('input', $event.target.value)"
      />
    </div>
    <!-- 输入框 -->
    <button v-if="btnTitle" :disabled="disabled" @click="$emit('btn-click')">
      {{ btnTitle }}
    </button>
    <!-- 错误提醒 -->
    <div v-if="error" class="invalid_feedback">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: "inputGroup",
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: String,
    placeholder: String,
    name: String,
    btnTitle: String,
    disabled: Boolean,
    error: String,
  },
};
</script>

<style scoped>
.input_group input {
  width: 80%;
  height: 30px;
  margin: 10px 0px;
  padding: 2px 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: rgb(114, 114, 114);
  outline: none;
  border-radius: 5px;
}
.text_group {
  position: relative;
}
.text_group button {
  position: absolute;
  top: 18px;
  right: 30px;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 12px;
  /*  //消除默认点击蓝色边框效果*/
}
.invalid_feedback {
  margin-left: 20px;
  text-align: left;
  font-size: 12px;
  color: red;
}
.isinvalid input {
  border: 2px solid rgb(247, 111, 111);
}
</style>
