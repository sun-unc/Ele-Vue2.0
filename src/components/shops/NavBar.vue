<template>
  <div class="nav">
    <router-link to="/goods" class="nav-item">
      <span>点餐</span> 
      <i class="line"></i>
    </router-link>
    <router-link to="/comments" class="nav-item">
      <span>评价</span>
      <i class="line"></i>
    </router-link>
    <router-link to="/seller" class="nav-item">
      <span>商家</span>
      <i class="line"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
  .nav {
    position: sticky;
    top: 0rem;
    box-sizing: border-box;
    padding: 1rem 1rem 0 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgb(238, 236, 236);
    background-color: #fff;
    z-index: 3;
  }
  .nav-item {
    display: flex;
    flex: 20vw;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    text-align: center;
    color: rgb(85, 85, 85);
  }
  .nav-item  span {
    height: 1.5rem;
  }
  .nav .active {
    font-weight: bold;
    background: transparent;
  }
  .nav .active  .line {
    display: inline-block;
    width: 2rem;
    height: 3px;
    border-bottom: 3px solid rgb(68, 124, 247);
  }
</style>