import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
//mint-ui
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import { Indicator } from "mint-ui";
// 将url中的参数转为对象; 将对象转为url参数形式
import qs from 'qs';

Vue.config.productionTip = false;
// 全局声明
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "https://element-interface-october.herokuapp.com/";
// //请求拦截
axios.interceptors.request.use(
  (config) => {
    if(config.method == 'post') {
      config.data = qs.stringify(config.data)
    }
    //加载mint-ui动画
    Indicator.open();
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
//响应拦截
axios.interceptors.response.use(
  (res) => {
    Indicator.close();
    return res;
  },
  (err) => {
    //错误提醒
    Indicator.close();
    return Promise.reject(err);
  }
);

Vue.use(MintUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

