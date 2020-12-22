<template>
  <ul class="search_list">
    <li v-for="(item, index) in data" :key="index">
      <img v-if="item.image_path" :src="item.image_path" alt="">
      <i v-else class="fa fa-search"></i>
      <div class="shopitem">
        <span class="title">{{item.name || item}}</span>
        <span v-show="item.rating" class="rating">评分{{item.rating}}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SearchIndex",
  props: {
    data: Array,
  }

}
</script>

<style scoped>
.search_list li {
  display: flex;
  align-items: center;
  padding: 2.5vw;
  box-sizing: border-box;
  height: 10vw;
  width: 100%;
}
.search_list img {
  height: 100%;
}
.search_list i {
  color: rgb(97, 96, 96);
}
.shopitem {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(97, 96, 96);
  font-size: 0.9rem;
  padding-left: 3vw;
}
.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60vw;
}
.rating {
  white-space: nowrap;
  color: #999;
  font-size: 0.75rem;
}
</style>