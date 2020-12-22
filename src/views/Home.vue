<template>
  <div class="home">
    <div class="header">
      <div
        class="address_map"
        @click="$router.push({ name: 'address', params: { city: city } })"
      >
        <i class="fa fa-map-marker"></i>
        <span>{{ address }}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
    </div>
    <div class="search_wrap" 
         :class="{'fixedview': showFilter}"
         @click="$router.push('/search')">
      <div class="shop_search">
        <i class="fa fa-search"></i>
        搜索商家 商家名称
      </div>
    </div>
    <div id="container">
      <!-- //轮播 -->
      <mt-swipe :auto="4000" class="swiper">
        <mt-swipe-item v-for="(item, index) in swiperImgs" :key="index"
          ><img :src="item" alt=""
        /></mt-swipe-item>
      </mt-swipe>
      <!-- 分类 -->
      <mt-swipe :auto="0" class="entries" :show-indicators="false">
        <mt-swipe-item
          v-for="(entry, i) in entries"
          :key="i"
          class="entry_wrap"
        >
          <ul class="entry_items">
            <li class="foodentry" v-for="(item, index) in entry" :key="index">
              <div class="img_wrap">
                <img :src="item.image" alt="" />
              </div>
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </mt-swipe-item>
      </mt-swipe>
      <!-- 推荐商家 -->
      <div class="shoplist-title">推荐商家</div>
    </div>
    <!-- 导航 -->
    <filter-view :filterData="filterData" @searchFixed="showFilterView" @update="update"/>
    <!-- 商家信息 -->
    <mt-loadmore 
    :top-method="loadData" 
    :bottom-method="loadMore" 
    :bottom-all-loaded="allLoaded" 
    ref="loadmore"
    :auto-fill="false"
    :bottomPullText="bottomPullText">
      <div class="shoplist">
        <index-shop 
        v-for="(item, index) in restaurants" 
        :key="index"
        :restaurant=item.restaurant />
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Loadmore } from 'mint-ui';
import FilterView from "../components/FilterView"
import IndexShop from "../components/IndexShop"
export default {
  name: "home",
  data () {
    return {
      swiperImgs: [],
      entries: [],
      filterData: null,
      showFilter: false,
      page: 1,
      size: 5,
      restaurants: [],//存放所有商家信息
      allLoaded: false,
      bottomPullText: "上拉加载更多...",
      data: null
    }
  },
  computed: {
    address () {
      return this.$store.getters.address;
    },
    city () {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    },
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      this.$axios.get("/api/profile/shopping").then(res => {
        this.swiperImgs = res.data.swipeImgs;
        this.entries = res.data.entries;
      });
      this.$axios("/api/profile/filter").then(res => {
        this.filterData = res.data
      });
      this.loadData();
    },
    loadData() {
      this.page = 1;
      this.allLoaded = false;
      this.bottomPullText = "上拉加载更多"
      //拉取商户列表
      this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`, this.data).then(res => {
        // console.log(res.data);
        //上拉加载完成
        this.$refs.loadmore.onTopLoaded();
        this.restaurants = res.data;
      })
    },
    loadMore() {
      if(!this.allLoaded) {
        this.page ++;
        //拉取商户列表
        this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`).then(res => {
          // console.log(res.data);
          //下拉加载完成重新渲染
          this.$refs.loadmore.onBottomLoaded();
          if(res.data.length > 0) {
            res.data.forEach(item => {
            this.restaurants.push(item);
            })
            if(res.data < this.size) {
              this.allLoaded = true;
              this.bottomPullText = "我也是有限度的~"
            }
          }else{
            //数据为空
            this.allLoaded = true;
            this.bottomPullText = "我也是有限度的~"
          }
        })
      }
    },
    showFilterView(isShow) {
      this.showFilter = isShow 
    },
    update(condition) {
      this.data = condition;
      // console.log(condition);
      this.loadData();
    }
  },
  components: {
    FilterView,
    IndexShop
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  /* height: 90px; */
  letter-spacing: 3px;
  padding-bottom: 45px;
}
.header {
  position: relative;
  padding: 20px 10px;
  padding-bottom: 0;
  background-color: rgb(54, 138, 248);
}
.address_map {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: white;
  font-weight: bold;
}
.address_map i:last-child {
  position: absolute;
  right: 50px;
  top: 18px;
}
.search_wrap {
  position: sticky;
  box-sizing: border-box;
  top: 0;
  background-color: rgb(54, 138, 248);
  padding: 10px 0;
  z-index: 999;
}
.shop_search {
  margin: 0 auto;
  width: 94%;
  height: 30px;
  border-radius: 4px;
  background-color: #fff;
  color: rgb(138, 137, 137);
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
.swiper {
  height: 25vw;
}
.swiper img {
  width: 100%;
}
.entries {
  padding: 5px 5px;
  height: 120px;
  background-color: #fff;
}
/* .foodentry {
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img_wrap img {
  width: 80%;
  height: 80%;
}

.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
} */
.entry_items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  text-align: center;
}
.foodentry {
  flex: 20%;
}
.foodentry span {
  color: #666;
  font-size: 0.32rem;
}
.img_wrap img {
  width: 35px;
}
/* 推荐商家 */
.shoplist-title {

  text-align: center;
  font-weight: bold;
  background-color: #fff;
  padding: 0.5rem 0 1rem 0;
}
.shoplist-title::before {
  content: "—";
  width: 5.3333vw;
  height: 0.26667vw;
  color: #999;
  margin-right: 3.466667vw;
}
.shoplist-title::after {
  content: "—";
  color: #999;
  margin-left: 3.466667vw;
}
.fixedview {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 3;
}
.mint-loadmore {
  font-size: 10px;
  height: calc(100% - 95px);
  overflow: auto;
  touch-action: none ;
}

</style>
