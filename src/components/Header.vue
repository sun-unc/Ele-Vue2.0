<template>
  <div class="header">
    <!-- 左侧返回 -->
    <div class="header-button is-left" v-show="isLeft">
      <i class="fa fa-chevron-left"></i>
      <button @click="$router.go(-1)">返回</button>
    </div>
    <!-- 中间返回 -->
    <h1 class="header-title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
    isLeft: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.header {
  position: relative;
  width: 100%;
  height: 45px;
  background-color: rgb(54, 138, 248);
  color: white;
  font-weight: bold;
}
.header h1 {
  text-align: center;
  line-height: 45px;
  font-size: 16px;
}
.header-button {
  position: absolute;
  margin-left: 10px;
  margin-top: 12px;
}
.header-button button {
  border: 0;
  background-color: transparent;
  outline: none;
  color: white;
  font-weight: bold;
}
</style>
