<template>
  <div class="me">
    <div class="headInfo">
      <div class="head-img"></div>
      <div class="head-profile">
        <p class="user-id" v-if="userInfo">{{userInfo._id}}</p>
        <p v-else class="user-id" @click="handleLogin">登录/注册</p>
        <p class="user-phone">
          <i class="fa fa-mobile"></i>
          <span v-if="userInfo">{{encryptPhone(userInfo.phone)}}</span>
          <span v-else>登录后享受更多特权</span>
        </p>
      </div>
      <i class="fa fa-angle-right"></i>
    </div>
    <div v-if="userInfo">
      <div class="address-cell">
        <i class="fa fa-map-marker"></i>
        <div class="address-index" @click="myAddress">
          <span>我的地址</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <button @click="handleLogout" class="loginOut-btn">退出登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "me",
  data() {
    return {
      userInfo: ""
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData())
  },
  methods: {
    handleLogin () {
      this.$router.push("/login");
    },
    getData() {
      const user_id = "5f9f837d99b90300175587d0";
      this.$axios(`/api/user/user_info/${user_id}`)
      .then(res => {
        // console.log(res.data);
        this.userInfo = res.data;
      })
    },
    encryptPhone(phone) {
      return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"); 
    },
    handleLogout() {
      localStorage.removeItem("ele_login");
      this.$router.push("/login");
    },
    myAddress() {
       if(this.userInfo.myAddress.length > 0){
         this.$router.push("/myAddress")
       } else {
         this.$router.push("/addAddress")
       }
    }
  }
};
</script>

<style scoped>
.headInfo {
  box-sizing: border-box;
  display: flex;
  padding: 6.666667vw 4vw;
  align-items: center;
  width: 100%;
  height: 30vw;
  background: linear-gradient(to right, #62a6ff 0%,#0d5df1 100%);
  
}
.head-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-position: 0px 0px;
  background-size: 60px;
  background-image: url(https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png);
}
.head-profile {
  overflow: hidden;
  margin-left: 5vw;
  color: aliceblue;
  font-size: 1.4rem;
  max-width: 45vw;
}
.head-profile p:nth-child(1) {
  margin-bottom: 0.5rem;
}
.head-profile  .user-phone {
  font-size: 0.8rem;
}
.headInfo .fa-angle-right {
  position:absolute;
  right: 1rem;
  color: aliceblue;
  font-size: 1.4rem;
}
.address-cell {
  box-sizing: border-box;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 12vw;
  border: 1px solid #ccc;
}
.address-cell>i {
  color: #4986f8;
  font-size: 1.2rem;
  margin-right: 0.5rem;
}
.address-index span {
  width: 85vw;
  display: inline-block;
  font-weight: bold;
}
.address-index>i {
  color: rgb(192, 189, 189);
  font-size: 1.2rem;
}
.loginOut-btn {
  width: 100%;
  border: none;
  margin-top: 1.5rem ;
  background-color: transparent;
  outline: none;
  height: 12vw;
  color: rgb(240, 58, 94);
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
}
</style>
