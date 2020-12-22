<template>
<div :class="{'open': isSort || isScreen}" @click.self="hideView">
  <!-- 导航 -->
  <div class="filter_wrap" v-if="filterData">
    <aside class="filter">
      <div class="filter-nav" 
           v-for="(item, index) in filterData.navTab" 
           :key="index" 
           :class="{'filter-bold': currentFilter === index}"
           @click="filterSort(index)">
        <span>{{ item.name }}</span>
        <i v-if="item.icon" :class="'fa fa-' + item.icon"></i>
      </div>
    </aside>
  </div>
  <!-- 排序 -->
  <section class="filter-extend" v-if="isSort">
    <ul>
      <li v-for="(item, index) in filterData.sortBy" 
          :key="index" 
          @click="selectSort(item, index)">
        <span :class="{'selectName': currentSort === index}">{{item.name}}</span>
        <i v-show="currentSort === index" class="fa fa-check"></i>
      </li>
    </ul>
  </section>
  <!-- 筛选 -->
  <section class="filter-extend" v-if="isScreen">
    <div class="filter-sort">
      <div class="morefilter" v-for="(screen, index) in filterData.screenBy" :key="index">
        <p class="title">{{screen.title}}</p>
        <ul>
          <li v-for="(item, i) in screen.data" :key="i" 
              :class="{'selected': item.select}"
              @click="selectScreen(item, screen)">
            <img v-if="item.icon" :src="item.icon" alt="">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="morefilter-btn">
      <span class="morefilter-clear" 
            :class="{'edit': edit}"
            @click="clearFilter">清空</span>
      <span class="morefilter-ok"
            @click="filterOk">确定</span>
    </div>
  </section>
</div>
</template>

<script>
export default {
  name: "FilterView",
  props: {
    filterData: null
  },
  data() {
    return {
      currentFilter: 0,
      isSort: false,
      currentSort: 0,
      isScreen: false
    }
  },
  methods: {
    //条件筛选条
    filterSort(index) {
      this.currentFilter = index;
      switch(index) {
        case 0:
          this.isSort = true;
          this.isScreen = false;
          this.$emit("searchFixed", true);
          break
        case 1:
          this.$emit("update", {condition: this.filterData.navTab[1].condition})
          this.hideView();
          break;
        case 2:
          this.$emit("update", {condition: this.filterData.navTab[2].condition})
          this.hideView();
          break;
        case 3:
          this.isScreen = true;
          this.isSort = false;
          this.$emit("searchFixed", true);
          break;
        default: 
          this.hideView();
          break;
      }
    },
    hideView() {
      this.isSort = false;
      this.isScreen = false;
      this.$emit("searchFixed", false)
    },
    selectSort(item, index) {
      this.currentSort = index;
      this.filterData.navTab[0].name = this.filterData.sortBy[index].name
      // console.log(this.filterData);
      this.hideView();
      //更新数据
      this.$emit("update", {condition: item.code});
    },
    //
    selectScreen(item, screen) {
      if(screen.id !== "MPI") {
        //单选
        screen.data.forEach(ele => {
          ele.select = false;
        });
      }
      item.select = !item.select;
    },
    //清空按钮
    clearFilter() {
      this.filterData.screenBy.forEach(screen => {
        screen.data.forEach(item => {
          item.select = false;
        })
      })
    },
    // 确定按钮
    filterOk() {
      let screenData = {
        MPI: "",
        offer: "",
        per: ""
      };
      let mpiStr = "";
      this.filterData.screenBy.forEach(screen => {
        screen.data.forEach((item, index) => {
          if(item.select) {
            //两种情况 1.多选 2.单选
            if(screen.id !== "MPI") {
              //单选
              screenData[screen.id] = item.code;
            }else{
              //多选
              mpiStr += item.code + ",";
              screenData[screen.id] = mpiStr;
            }
          }
        })
      });
      this.$emit("update", {condition: screenData});
      this.hideView();
    }
  },
  computed: {
    //清空按钮显示/隐藏
    edit() {
      let edit = false;
      this.filterData.screenBy.forEach(screen => {
        screen.data.forEach(item => {
          if(item.select){
            edit = true;
          }
        })
      })
      return edit;
    }
  }
}
</script>

<style scoped>
.filter {
  padding: 0.31rem 0;
  height: 1.2rem;
  display: flex;
  background-color: #fff;
  line-height: 1.2rem;
}
.filter-nav {
  display: inline-block;
  font-size: 0.32rem;
  flex: 1;
  text-align: center;
  color: rgb(121, 121, 121);
}
.filter-bold {
  font-weight: 800;
  color: rgb(66, 66, 66);
}
.open {
  position: fixed;
  top: 49px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 3
}
.filter-extend {
  background-color: #fff;
  color: rgb(66, 66, 66);
  font-size: 0.4rem;
}
.filter-extend li {
  /* position: relative; */
  padding: 0 5vw;
  line-height: 8vw;
  overflow: hidden;
}
.fa-check {
  float: right;
  color: #009eef;
  line-height: 8vw;
}
.selectName {
  color: #009eef;
}
.title {
  line-height: 12vw;
  padding-left: 4vw;
  font-weight: 600;
  color: rgb(128, 125, 125);
  font-size: 13px;
}

.morefilter ul{
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
}
.morefilter li {
  box-sizing: border-box;
  width: 30%;
  height: 9.333333vw;
  line-height: 9.333333vw;
  margin: 0.8vw 1%;
}
.morefilter li img {
  width: 3.466667vw;
  height: 3.466667vw;
  vertical-align: middle;
  margin-right: 0.8vw;
}
.morefilter-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 11.466667vw;
  width: 100%;
  font-size: 0.9rem;
  font-weight: 600;
  border-top: 1px solid rgb(231, 231, 231);
  box-sizing: border-box;
}
.morefilter-clear {
  flex: 1;
  text-align: center;
  color: #ddd !important;
}
.morefilter-ok {
  flex: 1;
  text-align: center;
  color: #fff;
  background-color: #00d762;
}
.selected {
  color: #3190e8 !important;
  background-color: #edf5ff !important;
}
.edit {
    color: rgb(94, 94, 94) !important;
}
</style>
