<template>
  <transition name="fade">
    <div class="info-model" v-show="showInfoModel">
      <div class="brief-model">
        <h2>
          <i v-if="rst.is_premium">品牌</i>
          <span>{{rst.name}}</span>
        </h2>
        <ul>
          <li>
            <h3>{{rst.rating}}</h3>
            <p>评分</p>
          </li>
          <li>
            <h3>{{rst.recent_order_num}}</h3>
            <p>月售</p>
          </li>
          <li v-if="rst.delivery_mode">
            <h3>蜂鸟专送</h3>
            <p>约{{rst.order_lead_time}}分钟</p>
          </li>
          <li>
            <h3>¥{{rst.float_delivery_fee}}元</h3>
            <p>配送费</p>
          </li>
          <li>
            <h3>{{(rst.distance / 1000).toFixed(1)}}km</h3>
            <p>距离</p>
          </li>
        </ul>
        <h3 class="promotion">
          <span>公告</span>
        </h3>
        <p class="brief-modal-yx">{{rst.promotion_info}}</p>
      </div>
      <!-- x号 -->
      <div class="brief-modal-close" @click="$emit('close')">
        <img src="https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/" alt="">
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "InfoModel",
  props: {
    rst: Object,
    showInfoModel: Boolean
  }
}
</script>

<style scoped>
  .info-model {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba( 60, 60, 60, 0.5);
    z-index: 999;
  }
  .brief-model {
    position: relative;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 75vw;
    height: 50vw;
    background-color: #fff;
    border-radius: 6px;
    z-index: 999;
  }
  .brief-model h2 {
    font-size: 1.3rem;
    font-weight: 800;
    box-sizing: border-box;
    padding: 5vw 8vw;
    text-align: center;
  }
  .brief-model h2 i {
    display: inline-block;
    vertical-align: top;  
    font-size: 0.5rem;
    line-height: 1.3rem;
    background-color: rgb(252, 236, 6);
    border-radius: 0.2rem;
    padding: 0 0.1rem;
    margin-right: 0.2rem;
  }
 .brief-model ul {
   display: flex;
   justify-content: space-around;
   width: 100%;
   padding: 0 2vw;
   box-sizing: border-box;

 }
 .brief-model ul li {
   display: flex;
   flex-direction: column;
   align-items: center;
 }
 .brief-model ul h3 {
   font-weight: bold;
   font-size: 0.9rem;
   margin-bottom: 0.4rem;
 } 
 .brief-model ul p {
   font-size: 0.5rem;
   color: rgb(129, 129, 129);
 }
 .promotion {
   color: rgb(129, 129, 129);
   font-size: 0.8rem;
 }
 .promotion::before {
   content: '— ';
 }
 .promotion::after {
   content: ' —';
 }
 .brief-modal-yx {
   font-size: .8rem;
   margin-bottom: 1rem;
 }
 .brief-modal-close {
   position: relative;
   top: 35%;
   left: 50%;
   transform: translateX(-50%);
   width: 2rem;
   height: 2rem;
 }
 .brief-modal-close img {
   width: 100%;
 }

 /* 动画样式 */
 .fade-enter-active,
 .fade-leave-active {
   transition: opacity 0.35s ease-out;
 }

 .fade-enter,
 .fade-leave-to {
   opacity: 0;
 }
</style>