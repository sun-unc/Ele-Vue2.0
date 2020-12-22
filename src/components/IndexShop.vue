<template>
  <section class="index-container">
    <div class="index-shopInfo" @click="$router.push('/shop')">
      <!-- 左侧图片 -->
      <div class="log_container">
        <img :src="restaurant.image_path" alt="">
      </div>
      <!-- 右侧内容 -->
      <div class="index_main">
        <!-- 第一行  品牌 -->
        <div class="index_shopname">
          <i v-if="restaurant.is_premium">品牌</i>
          <span>{{restaurant.name}}</span>
        </div>
        <!-- 第二行 星级 -->
        <div class="index-rateWrap">
          <div>
            <rating :rating="restaurant.rating" />
            <!-- 评分 -->
            <span class="rate">{{restaurant.rating}}</span>
            <span>月售{{restaurant.recent_order_num}}单</span>
            <div class="delivery" v-if="restaurant.delivery_mode">
              <span class="icon-hello">
                {{restaurant.delivery_mode.text}}
              </span>
            </div>
          </div>
        </div>
          <!-- 第三行 配送 -->
        <div class="index-moneylimit">
          <div class="index-money">
            <span>¥{{restaurant.float_minimum_order_amount}}起送</span>
            <span>配送费¥{{restaurant.float_delivery_fee}}</span>
          </div>
          <div class="index-distanceWrap">
            <span>{{(restaurant.distance / 1000).toFixed(2)}}km</span>
            <span>{{restaurant.order_lead_time}}分钟</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Rating from "./Rating"
export default {
  name: "IndexShop",
  props: {
    restaurant: Object
  },
  components: {
    Rating,
  }
}
</script>

<style scoped>
  .index-shopInfo {
    display: flex;
    justify-content: flex-start;
    padding: 3.56666vw 2.66666vw;
    align-items: stretch;
  }
  .log_container {
    width: 18.3333vw;
    height: 18.3333vw;
  }
  .log_container img {
    display: block;
    height: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .index_main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    padding-left: 2.666667vw;
    font-size: 0.7rem;
    flex-grow: 1;
  }
  .index_shopname {
    white-space:nowrap; 
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .index_shopname i{
    display: inline-block;
    box-sizing: border-box;
    padding: 0.15rem;
    margin-right: 0.25rem;
    background-color: gold;
    font-size: 0.5rem;
    font-weight: bold;
    text-align: center;
    border-radius: 10%;
  }
  .index_shopname span {
    font-weight: bold;
    font-size: 0.9rem;
  }
  .index-rateWrap {
    box-sizing: border-box;
    color: #707070;
    margin: 2vw 0;
  }
  .Rating-gray i{
    color: gold;
  }
  .rate {
    margin-right: 0.3rem;
  }
  .delivery {
    float: right;
    padding: 0.1rem;
    background-color: rgb(54, 138, 248);
    color: #fff;
    border-radius: 5%;
  }
  .index-moneylimit {
    color: #707070;
  }
  .index-moneylimit div span:nth-child(1)::after{
    content: '|';
    margin: 0 1vw;
  }
  .index-money {
    display: inline-block;
  }
  .index-distanceWrap {
    float: right;
  }
</style>