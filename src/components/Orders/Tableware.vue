<template>
<transition name="fade">
   <div class="tableware" v-if="isShow">
     <div class="actions-sheet">
       <i class="fa fa-remove" @click="$emit('close')"></i>
       <h2 class="actions-sheet-header">
         <span class="tag"></span>
         <span class="title">餐具份数</span>
         <span class="tag"></span>
       </h2>
       <ul>
         <li :class="{'selected': selectItem == item }" @click="clickItem(item)" v-for="(item, index) in tablewareList" :key="index">{{item}}</li>
       </ul>
     </div>
   </div>
</transition>
</template>

<script>
export default {
  name: "Tableware",
  data() {
    return {
      tablewareList:["1","2","3","4","5","6"],
      selectItem: 1
    }
  },
  props: {
    isShow: Boolean
  },
  methods: {
    clickItem(item) {
      this.selectItem = item;
      this.$store.dispatch("setRemarkInfo", {
        tableware: item + "份餐具",
        remark: this.$store.getters.remarkInfo.remark
      })
      this.$emit("close")
    }
  }
}
</script>

<style scoped>
.tableware {
  width: 100vw;
  height: 100vh;
  background: rgba(41, 41, 41, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.actions-sheet {
  width: 100%;
  height: 45vh;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
}
.actions-sheet {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.actions-sheet i {
  align-self: flex-end;
  color: rgb(156, 156, 156);
  font-size: 1.1rem;
  margin: 0.5rem;
}
.actions-sheet-header {
  font-weight: bold;
  font-size: 1.05rem;
}
.title::before{
  content: '—';
  margin-right: 0.5rem;
}
.title::after{
  content: '—';
  margin-left: 0.5rem;
}
ul li {
  font-weight: 500;
  margin: 2rem auto;
}

/* 过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
/* 选中样式 */
.selected {
  color: #2396ff;
  font-weight: 500;
}
</style>