<template>
  <div class="address">
    <Header :isLeft="true" title="选择收货地址"></Header>
    <div class="city_search">
      <div class="search">
        <span class="city" @click="$router.push('/city')">
          {{ city }}
          <i class="fa fa-angle-down"></i>
        </span>
        <i class="fa fa-search"></i>
        <input type="text" v-model="search_val" placeholder="小区/写字楼/学校等" />
      </div>
      <location :address="getAddress" @current-location="selectAddress" />
    </div>
    <div class="area" v-show="search_val">
      <ul class="area_list" v-for="(item, index) in areaList" :key="index">
        <li @click="selectAddress(item)">
          <h4>{{ item.name }}</h4>
          <p>{{ item.district }}{{ item.address }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Location from "../components/Location";
export default {
  name: "getAddress",
  data () {
    return {
      city: "", //当前的城市
      search_val: "",
      areaList: [],
    };
  },
  computed: {
    getAddress () {
      return this.$store.getters.location.formattedAddress;
    },
  },
  watch: {
    search_val () {
      this.searchPlace();
    },
  },
  methods: {
    searchPlace () {
      const self = this;
      AMap.plugin("AMap.Autocomplete", function () {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: self.city,
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(self.search_val, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          self.areaList = result.tips;
        });
      });
    },
    selectAddress (item) {
      if (item) {
        //设置地址
        this.$store.dispatch(
          "setAddress",
          item.district + item.address + item.name
        );
      } else {
        this.$store.dispatch("setAddress", this.getAddress)
      }

      //路由跳转到home
      this.$router.push("/home");
    },
  },
  components: {
    Header,
    Location,
  },
  beforeRouteEnter (to, from, next) {
    // console.log(to);
    next((prop) => {
      // console.log(prop);
      prop.city = to.params.city;
    });
  },
};
</script>

<style scoped>
.city_search {
  padding-top: 15px;
  width: 100%;
  background-color: #fff;
  color: #333;
}
.search {
  margin: 0 15px;
  width: 90%;
  font-weight: 600;
  line-height: 30px;
  background-color: rgb(231, 230, 230);
  border-radius: 8px;
}
.city {
  margin: 0 15px;
}
.search input {
  height: 20px;
  outline: none;
  border: none;
  border-radius: 15px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  font-weight: bold;
  background-color: rgb(231, 230, 230);
}
.area {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  font-weight: bold;
  color: rgb(73, 73, 73);
}
.area_list {
  margin: 8px 0;
  box-sizing: border-box;
}
.area_list p {
  width: 100%;
  display: inline-block;
  margin-top: 3px;
  font-size: 12px;
  color: rgb(133, 133, 133);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
