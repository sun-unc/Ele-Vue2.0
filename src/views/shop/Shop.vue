<template>
  <div class="shop" v-if="shopInfo">
    <!-- 头部 -->
    <div class="header_nav">
      <div class="nav_bg">
        <img :src="shopInfo.rst.scheme" alt="">
      </div>
      <div class="nav_back">
        <i @click="$router.push('/home')" class="fa fa-chevron-left"></i>
      </div>
      <div class="shop_image">
        <img :src="shopInfo.rst.image_path" alt="">
      </div>
    </div>
    <!-- 商家信息 -->
    <div class="index-rst">
      <div class="rst-name">
        <span @click="showInfoModel = true">{{shopInfo.rst.name}}</span>
        <i class="fa fa-caret-right"></i>
      </div>
      <!-- 弹窗信息 -->
      <info-model :rst="shopInfo.rst" :showInfoModel="showInfoModel" @close="showInfoModel = false"/>
    </div>
    <!-- 销售信息 -->
    <div class="rst-order">
      <span>评分:{{shopInfo.rst.rating}}</span>
      <span>月售:{{shopInfo.rst.recent_order_num}}</span>
      <span>蜂鸟专送约:{{shopInfo.rst.order_lead_time}}分钟</span>
    </div>
    <!-- 优惠信息 -->
    <active :activities="shopInfo.rst.activities" />
    <!-- 公告 -->
    <p class="rst-promotion">公告: {{shopInfo.rst.promotion_info}}</p>
    <!-- 导航 -->
    <nav-bar />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import InfoModel from "../../components/shops/InfoModel"
import Active from "../../components/shops/Active"
import NavBar from "../../components/shops/NavBar"
export default {
  name: 'Shop',
  data() {
    return {
      shopInfo: null,
      showInfoModel: false,
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios("/api/profile/batch_shop")
      .then(res => {
        this.shopInfo = res.data;
      })
    }
  },
  components: {
    InfoModel,
    Active,
    NavBar
  }
}
</script>

<style scoped>
  .header_nav {
    position: relative;
  }
  .nav_bg {
    width: 100%;
    height: 8rem;
  }
  .nav_bg img {
    width: 100%;
    height: 100%;
  }
  .nav_back {
    position: absolute;
    top: 0.4rem;
    left: 0.4rem;
    font-size: 1.2rem;
    color: #fff;
  }
  .shop_image {
    position: absolute;
    top: 3.4rem;
    left: 50%;
    transform: translateX(-50%);
    width: 6rem;
    height: 6rem;
  }
  .shop_image img {
    width: 100%;
    height: 100%;
  }
  .index-rst {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .rst-name {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.6rem;
    width: 100%;
    font-size: 1.3rem;
    font-weight: 800;
  }
  .rst-name span {
    max-width: 70vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .rst-order {
    text-align: center;
    color: rgb(107, 107, 107);
    margin: 1rem 0;
    font-size: 0.8rem;
  }
  .rst-order span {
    margin-left: 0.5rem;
  }
  .rst-promotion {
    color: rgb(129, 127, 127);
    font-size: 0.8rem;
    margin: 0 10vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>