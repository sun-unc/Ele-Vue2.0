<template>
  <div class="shopcart">
    <transition name="fade">
    <div class="cartview-cartmask" @click.self="showCartView = !showCartView" v-show="showCartView && !isEmpty">
      <div class="cartview-cartbody">
        <div class="cartview-cartheader">
          <span>已选商品</span>
          <button @click="clearFoods">
            <i class="fa fa-trash-o"></i>
            <span>清空</span>
          </button>
        </div>
        <div class="entityList-cartbodyScroller">
          <ul class="entityList-cartlist">
            <li class="entityList-entityrow" v-for="(food, index) in selectFoods" :key="index">
              <h4>
                <span>{{food.name}}</span>
              </h4>
              <span class="entityList-entitytotal">{{food.activity.fixed_price}}</span>
              <cart-control :food="food" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    </transition>
    <div class="bottomNav-cartfooter" :class="{'bottomNav-carticon-empty': isEmpty}">
      <span class="bottomNav-carticon" @click="showCartView = !showCartView">
        <i class="fa fa-cart-plus"></i>
        <span v-if="totalCount">{{totalCount}}</span>
      </span>
      <div class="bottomNav-cartInfo" @click="showCartView = !showCartView">
        <p class="bottomNav-cartTotal">
          <span v-if="isEmpty">未选购商品</span>
          <span v-else>¥{{totalPrice.toFixed(2)}}</span>
        </p>
        <p class="bottomNav-cartdelivery">
          另需配送费{{shopInfo.rst.float_delivery_fee}}元
        </p>
      </div>
      <button class="submit-btn">
        <span v-if="isEmpty">¥{{shopInfo.rst.float_minimum_order_amount}}元起送</span>
        <span @click="settlement" v-else>去结算</span>
      </button>
    </div> 
  </div>
</template>

<script>
import CartControl from "../../components/shops/CartControl"
export default {
  name: "ShopCart",
  components: {
    CartControl
  },
  data() {
    return {
      totalCount: 0,
      totalPrice: 0,
      selectFoods: [],
      showCartView: false
    }
  },
  props: {
    shopInfo: Object,
  },
  methods: {
    clearFoods() {
      this.shopInfo.recommend.forEach(recommend => {
        recommend.items.forEach(item => {
          item.count = 0;
        })
      });
      this.shopInfo.menu.forEach(menu => {
        menu.foods.forEach(item => {
          item.count = 0;
        })
      });
    },
    settlement() {
      this.$store.dispatch("setOrderInfo", {
        shopInfo: this.shopInfo.rst,
        selectFoods: this.selectFoods
      })
      this.$router.push("/settlement")
    }
  },
  computed: {
    isEmpty() {
      let empty = true;
      this.totalCount = 0;
      this.totalPrice = 0;
      this.selectFoods = [];
      this.shopInfo.recommend.forEach(recommend => {
        recommend.items.forEach(item => {
          if(item.count) {
            empty = false;
            this.totalCount += item.count;
            this.totalPrice += item.activity.fixed_price * item.count;
            this.selectFoods.push(item)
          }
        })
      })

      this.shopInfo.menu.forEach( menu => {
        menu.foods.forEach(food =>{
          if(food.count) {
            empty = false 
            this.totalCount += food.count;
            this.totalPrice += food.activity.fixed_price * food.count;
            this.selectFoods.push(food);
          }
        })
      } 
      )
      return empty;
    }
  }
}
</script>

<style scoped>
  .bottomNav-cartfooter {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0px;
    right: 0;
    left: 0;
    padding-left: 5.066667vw;
    background-color: rgba(61, 61, 63, 0.9);
    height: 4rem;
    z-index: 1000;
    
  }
 .bottomNav-carticon {
   display: inline-block;
   position: relative;
   top: -0.8rem;
   width: 2.5rem;
   height: 2.5rem;
   border-radius: 50%;
   background-color: rgb(75, 134, 245);
   font-size: 1.6rem;
   text-align: center;
   line-height: 2.5rem;
   color: aliceblue;
   border:0.3rem solid rgb(56, 56, 56)
 }
 .bottomNav-carticon span {
    display: inline-block;
    position: relative;
    top: -3.7rem;
    left: 1rem;
    font-size: 0.8rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: rgb(247, 60, 60);
    text-align: center;
    line-height: 1rem;

 }
 .bottomNav-cartInfo {
   position: absolute;
   left: 20vw;
   top: 50%;
   transform: translateY(-60%);
 }
 .bottomNav-cartdelivery {
   color: darkgrey;
 }
 .submit-btn {
   border: none;
   background-color: transparent;
   outline: none;
   width: 30vw;
   background-color: rgb(54, 228, 120);
   color: aliceblue;
   font-size: 1.15rem;
   font-weight: bold;
 }
 .bottomNav-cartTotal {
   color: aliceblue;
 }
 .bottomNav-carticon-empty .bottomNav-carticon{
   background-color: rgba(61, 61, 63, 0.9);
 }
 .bottomNav-carticon-empty .submit-btn {
   background-color: rgba(61, 61, 63, 0.9);
 }
 .cartview-cartmask {
   position: fixed;
   width: 100vw;
   height: 100vh;
   top: 0;
   left: 0;
   background-color: rgba(61, 61, 63, 0.9);
   z-index: 999;
 }

.cartview-cartbody {
  position: fixed;
  left: 0;
  width: 100%;
  background-color: #fff;
  bottom: 12.8vw;
  z-index: 201;
  opacity: 1;
  font-size: 1rem;
}
.cartview-cartheader {
  box-sizing: border-box;
  bottom: 4rem;
  left: 0;
  height: 3rem;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: #fff;
  color: rgb(114, 114, 114);
}
.cartview-cartheader span:first-child {
  font-size: 1.05rem;
  line-height: 3rem;
}
.cartview-cartheader button {
  border: none;
  background: transparent;
  outline: none;
  color: rgb(114, 114, 114);
}



.entityList-cartbodyScroller {
  box-sizing: border-box;
  overflow: auto;
  max-height: 80vw;
  padding-bottom: 1rem;
}
.entityList-entityrow {
  border-bottom: 0.133333vw solid #eee;
  display: flex;
  align-items: center;
  padding: 2vw 3.333333vw 2vw 0;
  min-height: 12.666667vw;
  margin-left: 3.333333vw;
}
.entityList-entityrow > h4 {
  flex: 5.5;
  line-height: normal;
}
.entityList-entityrow > h4 > span {
  display: inline-block;
  font-style: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  max-width: 46.666667vw;
}
.entityList-entitytotal {
  color: rgb(255, 83, 57);
  flex: 2.5;
  text-align: left;
  white-space: nowrap;
  font-weight: 700;
}
.entityList-entitytotal::before {
  content: "\A5";
  font-size: 0.6rem;
  color: currentColor;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

