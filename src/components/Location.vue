<template>
  <div class="location">
    <div class="title">当前定位</div>
    <div class="des" @click="$emit('current-location')">
      <i class="fa fa-location-arrow"></i>
      <span>{{ address }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "location",
  props: {
    address: String,
  },
};
</script>

<style scoped>
.location {
  margin: 0 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 4px 5px -4px #ccc;
}
.title {
  width: 100px;
  margin: 10px 0;
  font-size: 12px;
  color: rgb(107, 107, 107);
  font-weight: 600;
}
.des {
  padding-right: 10px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.des i {
  margin-right: 5px;
  color: rgb(45, 152, 247);
}
</style>
