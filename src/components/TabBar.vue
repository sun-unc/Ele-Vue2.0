<template>
  <div class="bottom-tab">
    <div class="tabbar">
      <router-link
        class="tab-item"
        v-for="(item, index) in data"
        :key="index"
        :to="item.path"
        active-class="is-selected"
      >
        <div class="tab-item-icon">
          <i :class="'fa fa-' + item.icon"></i>
        </div>
        <div class="tab-item-label">
          {{ item.title }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  props: {
    data: Array,
  },
};
</script>

<style scoped>
.bottom-tab {
  width: 100%;
  position: fixed;
  bottom: 0;
  box-shadow: 0px -2px 10px #b3b2b2;
}
.tabbar {
  height: 45px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
}
.tab-item {
  flex: 1;
  text-align: center;
}
.tab-item-icon {
  font-size: 18px;
}
/*正常的未被访问过的链接*/
a {
  color: #6e6e6e;
}

.is-selected {
  color: cornflowerblue;
}
.tab-item-label {
  margin-top: 4px;
}
</style>
