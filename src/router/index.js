import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/index.vue"),
    children: [
      {
        path: "",
        redirect: "/home",
      },
      {
        path: "home",
        name: "home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "order",
        name: "order",
        component: () => import("../views/Order.vue"),
      },
      {
        path: "/me",
        name: "me",
        component: () => import("../views/Me.vue"),
      },
      {
        path: "/address",
        name: "address",
        component: () => import("../views/Address.vue"),
      },
      {
        path: "/city",
        name: "city",
        component: () => import("../views/City.vue"),
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/Search.vue")
  },
  {
    path: "/shop",
    name: "shop",
    redirect: '/goods',
    component: () => import("../views/shop/Shop.vue"),
    children: [
      {
        path: "/goods",
        name: "goods",
        component: () => import("../views/shop/Goods.vue") 
      },
      {
        path: "/seller",
        name: "seller",
        component: () => import("../views/shop/Seller.vue")
      },
      {
        path: "/comments",
        name: "comments",
        component: () => import("../views/shop/Comments.vue")
      }
    ]
  },
  {
    path: "/myAddress",
    name: "MyAddress",
    component: () => import("../views/Orders/MyAddress.vue")
  },
  {
    path: "/addAddress",
    name: "AddAddress",
    component: () => import("../views/Orders/AddAddress.vue")
  },
  {
    path: "/settlement",
    name: "Settlement",
    component: () => import("../views/Orders/Settlement.vue")
  },
  {
    path: "/remark",
    name: "Remark",
    component: () => import("../views/Orders/Remark.vue")
  },
  {
    path: "/pay",
    name: "Pay",
    component: () => import("../views/Orders/Pay.vue")
  },
  {
    path: "/orderInfo",
    name: "OrderInfo",
    component: () => import("../views/Orders/OrderInfo.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history",
  linkActiveClass: "active"
});

//路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.ele_login ? true : false;
  if (to.path == "/login") {
    next();
  } else {
    //判断是否在登录状态下
    isLogin ? next() : next("/login");
  }
});

export default router;
