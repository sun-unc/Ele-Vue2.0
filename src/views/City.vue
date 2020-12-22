<template>
  <div class="city">
    <div class="fixed_wrap">
      <div class="search_wrap">
        <div class="search">
          <i class="fa fa-search"></i>
          <input v-model="city_val" type="text" placeholder="请输入城市名" />
        </div>
        <button
          @click="$router.push({ name: 'address', params: { city: getCity } })"
        >
          取消
        </button>
      </div>
      <!--   -->
      <div id="allCity">
        <location :address="getCity" @current-location="selectCity(getCity)" />
      </div>
    </div>
    <div :style="setHeight">
      <alphabet @select-city="selectCity" ref="allcity" />
    </div>
  </div>
</template>

<script>
import Location from "../components/Location";
import Alphabet from "./Alphabet";
export default {
  name: "city",
  components: {
    Location,
    Alphabet,
  },
  data () {
    return {
      city_val: "",
      win_height: "",
    };
  },
  mounted () {
    this.$refs.allcity.initScroll();
  },

  methods: {
    getCityInfo () {
      this.$axios("/api/posts/cities")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(123);

          this.$nextTick(() => {
            this.$refs.allcity.initScroll();
          });
        });
    },
    selectCity (item) {
      this.$router.push({ name: "address", params: { city: item } });
    },
  },
  created () {
    this.win_height = document.body.clientHeight;
    this.getCityInfo();
  },
  computed: {
    setHeight () {
      return { height: this.win_height - 100 + "px" };
    },
    getCity () {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    },
  },
};
</script>

<style scoped>
.city {
  padding-top: 4px;
  padding-bottom: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.fixed_wrap {
  position: fixed;
  top: 0px;
  width: 100%;
  height: 40px;
  background-color: #fff;
  z-index: 999;
}
.search {
  padding-left: 15px;
  margin-left: 15px;
  margin-top: 2px;
  width: 70%;
  height: 35px;
  line-height: 35px;
  background-color: rgb(230, 230, 230);
  border-radius: 7px;
}
.search input {
  margin-left: 5px;
  border: none;
  outline: none;
  background: none;
  font-weight: bold;
  color: rgb(90, 90, 90);
}
.city button {
  position: absolute;
  top: 10px;
  right: 20px;
  border: none;
  outline: none;
  background: none;
  color: rgb(91, 159, 238);
  font-weight: bold;
}
#allCity {
  width: 100%;
  background-color: #fff;
}
</style>
