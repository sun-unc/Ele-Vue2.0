<template>
  <div class="search">
    <Header :isLeft="true" title="搜索"/>
    <div class="search_header">
      <form class="search_wrap">
        <i class="fa fa-search"></i>
        <input type="text" v-model="key_word" placeholder="输入商家/商品信息">
        <button @click.prevent="searchHandle">搜索</button>
      </form>
    </div>
    <div class="shop" v-if="result && !showShop" >
      <div class="empty_wrap" v-if="empty">
        <img src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" alt="">
        <div class="enpty_text">
          <h4>附近没有搜索结果</h4>
          <span>换个关键词试试吧</span>
        </div>
      </div>
      <div v-else @click="shopItemClick">
        <search-index @click="$router.push('/shop')" :data="result.restaurants"/>
        <search-index :data="result.words"/>
      </div>
    </div>
    <div class="container" v-if="showShop">
      <!-- 导航 -->
      <filter-view :filterData="filterData" @update="update" />
      <!-- 商户列表 -->
      <div class="shoplist"
           v-infinite-scroll="loadMore"
           :infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <index-shop 
          v-for="(item, index) in restaurants" 
          :key="index"
          :restaurant=item.restaurant />
      </div>
    </div>
  </div>
</template>

<script>
import SearchIndex from "../components/SearchIndex"
import Header from "../components/Header";
import FilterView from "../components/FilterView"
import IndexShop from "../components/IndexShop"
import {InfiniteScroll} from "mint-ui"
export default {
  name: "Search",
  components: {
    Header,
    SearchIndex,
    FilterView,
    IndexShop
  },
  data() {
    return {
      key_word: "",
      result: [],
      empty: false,
      showShop: false,
      filterData: null,
      restaurants: [],
      page: 0,
      size: 7,
      loading: false,
      data: null,
      }
  },
  watch: {
    key_word(){
      this.empty = false;
      this.showShop = false;
      this.keyWordChange();
    }
  },
  created() {
    this.$axios("/api/profile/filter").then(res => {
      this.filterData = res.data
    });
  } ,
  methods: {
    keyWordChange() {
      // 请求数据
      this.$axios(`/api/profile/typeahead/${this.key_word}`).then( res => {
        this.result = res.data;
      }).catch( err => {
        this.result = null;
      })
    },
    searchHandle() {
      if(!this.key_word) return;
      //搜索
      if (this.result && (this.result.restaurants.length > 0 || this.result.words.length > 0)) {
        console.log("有内容");
        this.shopItemClick();
      }else{
        this.empty = true;
        console.log("没有内容");
      }
    },
    shopItemClick() {
      this.page = 0;
      this.restaurants = [];
      this.showShop = true;
    },
    update(condition) {
      this.data = condition;
      this.shopItemClick();
    },
    loadMore() {
      this.page++;
      //拉取商户列表
      this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`, this.data).then(res => {
        // console.log(res.data);
        //上拉加载完成
        if(res.data.length > 0) {
          res.data.forEach(item => {
            this.restaurants.push(item)
          })
        }else{
          this.loading = true;
        }
      })
    }
  }
}
</script>


<style scoped>
.search {
  position: fixed;
  width: 100%;
}
.search_header {
  width: 100%;
  height: 30px;
  box-sizing: border-box;
}
.search_wrap {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
}
.search_wrap i {
  flex: 5%;
  padding-left: 3vw;
  color: rgb(128, 127, 127);
}
.search_wrap input {
  flex: 75%;
  height: 30px;
  background-color: none;
  outline: none;
  border: none;
  color: rgb(97, 96, 96);
  font-size: 0.8rem;
}
.search_wrap button {
  flex: 10%;
  border: none;
  white-space: nowrap;
  background-color: transparent;
  outline: none;
  font-weight: bold;
  font-size: 0.9rem;
}
.shop {
  width: 100%;
  height: calc(100% - 80px);
  overflow: auto;
}
.empty_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.empty_wrap img {
  width: 35vw;
}
.enpty_text {
  color: #686767;
  font-size: 0.9rem;
}
.enpty_text span {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.7rem;
}
</style>