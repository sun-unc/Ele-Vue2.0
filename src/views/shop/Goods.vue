<template>
  <div v-if="shopInfo" class="goods">
    <!-- 商家推荐 -->
    <div class="recommend" v-for="(recommend, index) in shopInfo.recommend" :key="index">
      <p class="recommend-name">{{recommend.name}}</p> 
      <div class="recommend-wrap">
        <ul>
          <li v-for="(item, index) in recommend.items" :key="index">
            <img :src="item.image_path" alt="">
            <div class="recommend-food">
              <p class="recommend-food-name">{{item.name}}</p>
              <p class="recommend-food-zm">月售{{item.month_sales}} 好评率{{item.satisfy_rate}}%</p>
            </div>
            <div class="recommend-food-price">
              <p>¥{{item.activity.fixed_price}}</p>
              <!-- 计算数量 -->
              <cart-control :food="item"/>
            </div>
          </li>
        </ul>
      </div>     
    </div>
    <!-- 商品分类 -->
    <div class="menuview">
      <!-- 左侧分类列表 -->
      <div class="menu-wrapper" ref="menuScroll">
        <ul>
          <li @click="selectMenu(index)" v-for="(item, index) in shopInfo.menu" :key="index" :class="{'current': currentIndex === index}">
            <img :src="item.icon_url" alt="" v-if="item.icon_url">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <!-- 右侧商品内容 -->
      <div class="foods-wrapper" ref="foodScroll">
        <ul>
          <li class="food-list-hook" v-for="(item, index) in shopInfo.menu" :key="index">
            <!-- 内容上 -->
            <div class="category-title">
              <strong>{{item.name}}</strong>
              <span>{{item.description}}</span>
            </div>
            <!-- 内容下 -->
            <div @click="handleFood(food)" class="fooddetails" v-for="(food, i) in item.foods" :key="i">
              <!-- 左 -->
              <img :src="food.image_path" alt="">
              <!-- 右 -->
              <section class="fooddetails-info">
                <h4>{{food.name}}</h4>
                <p class="fooddetails-des">{{food.description}}</p>
                <p class="fooddetails-sales">月售{{food.month_sales}}份 好评率{{food.satisfy_rate}}</p>
                <div class="fooddetails-price">
                  <span class="price">¥{{food.activity.fixed_price}}</span>
                  <cart-control :food="food" />
                </div>
              </section>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购物车 -->
    <shop-cart :shopInfo="shopInfo"/>
    <!-- 商品详情 -->
    <food :food="selectedFood" :isShow="showFood" @close="showFood = false" />
  </div>
</template>

<script>
import BScroll from "better-scroll";
import CartControl from "../../components/shops/CartControl"
import ShopCart from "./ShopCart"
import Food from "./Food"
export default {
  name:"Goods",
  components: {
    CartControl,
    ShopCart,
    Food
  },
  computed: {
    // 根据右侧滚动的位置,确定对应的索引下标
    currentIndex() {
      for(let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i+1];

        // console.log(this.scrollY, height1, height2);

        //判断是否在两个高度之间
        if(this.scrollY >= height1 && this.scrollY <= height2){
          // console.log(i);
          return i;
        }
      }
      return 0;
    }
  },
  data() {
    return {
      shopInfo: null,
      menuScroll: {},//左侧滚动对象
      foodScroll: {},//右侧滚动对象
      scrollY: 0,//右侧菜单当前滚动到的Y值
      listHeight: [],//12个区列表高度
      selectedFood: null,
      showFood: false
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios("/api/profile/batch_shop")
      .then(res => {
        res.data.recommend.forEach(recommend => {
          recommend.items.forEach( item => {
            item.count = 0;
          })
        })

        res.data.menu.forEach(menu => {
          menu.foods.forEach(food => {
            food.count = 0;
          });
        });
        this.shopInfo = res.data;
        
        this.$nextTick(() => {
          // $nextTick就是在dom渲染完毕后执行操作
          this.initScroll();
          this.calculateHeight();
        })
      })
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        probeType: 3,
        click: true
      });
      // this.topScroll = new BScroll(this.$refs.topScroll, {
      //   // probeType: 3,
      //   click: true
      // })
      this.foodScroll.on("scroll", pos => {
        this.scrollY = Math.round(Math.abs(pos.y))

      })
    },
    selectMenu(index) {
      let foodlist = this.$refs.foodScroll.getElementsByClassName("food-list-hook")
      let el = foodlist[index];
      this.foodScroll.scrollToElement(el, 250);
    },
    calculateHeight() {
      let foodlist = this.$refs.foodScroll.getElementsByClassName("food-list-hook");
      //每个区域的高度添加到数组中
      let height = 0;
      this.listHeight.push(height);

      for(let i = 0; i < foodlist.length - 1; i++){
        let item = foodlist[i];
        //累加
        height += item.clientHeight;
        this.listHeight.push(height)
      }
      // console.log(this.listHeight);
    },
    handleFood(food) {
      this.selectedFood = food
      this.showFood = true
    }
  },
}
</script>

<style scoped>
  .goods {
    position: relative;
    height: calc(100vh - 3rem);
  }
  .recommend-name {
    margin-top: 0.8rem;
    margin-left: 0.5rem;
    font-weight: bold;
    font-size: 1.1rem;
  }
  .recommend-wrap {
    box-sizing: border-box;
    width: 100vw;
    overflow-x: scroll;
  }
  .recommend-wrap ul{
    display: flex;
  }
  .recommend-wrap ul img {
    width: 33.333333vw;
  }
  .recommend-wrap ul li {
    margin: 0.5rem 0.8rem;
  }
  .category-title span{
    margin-left: 0.5rem;
    color: rgb(87, 87, 87);
    font-size: 0.85rem;
  }
  .recommend-food-name {
    font-weight: bold;
    font-size: 1rem;
    width: 33.33333vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .recommend-food-zm {
    font-size: 0.9rem;
    color: rgb(141, 141, 141);
    margin: 0.4rem 0;
  }
  .recommend-food-price {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
  }
  .recommend-food-price p {
    font-size: 1.2rem;
    color: rgb(252, 88, 88);
  }
  /* 底部滚动条 */
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  .menuview {
    display: flex;
    height: calc(100vh - 3rem);
    /* overflow-y: scroll; */
  }
  .menu-wrapper {
    flex: 1;
    box-sizing: border-box;
    padding: 0 1rem;
    overflow-y: hidden;
  }
  .menu-wrapper ul li {
    margin: 2.5rem 0;
    color: rgb(110, 110, 110);
  }
  .menu-wrapper ul li:first-child {
    margin-top: 1rem;
  }

  .menu-wrapper ul li img {
    width: 1rem;
    margin-right: 0.3rem;
    vertical-align: top;
    border-radius: 0.2rem;
  }

  .menu-wrapper .current {
    color: rgb(48, 48, 48) !important;
    font-weight: bold;
    /* background-color: rgb(161, 161, 161); */
  }

  .foods-wrapper {
    flex: 3;
    height: calc(100vh - 3rem);
    overflow-y: hidden;

  }


  .fooddetails {
    display: flex;
    margin: 2rem 0;
  }
  .fooddetails img {
    height: 25vw;
    width: 25vw;
  }
  .fooddetails-info {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    color: rgb(138, 138, 138);
  }
  .fooddetails-info h4 {
    color: #000;
    font-weight: bold;

  }
  .fooddetails-info P {
    font-size: 0.8rem;
    max-width: 40vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .fooddetails-des {
    margin: 0.5rem 0;
  }
  .fooddetails-price {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    color: rgb(252, 88, 88);
    font-size: 1.1rem;
    max-width: 40vw;
  }

</style>