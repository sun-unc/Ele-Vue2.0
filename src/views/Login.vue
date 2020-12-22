<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/imgs/ele-logo.png" alt="my login image" />
    </div>
    <!-- 手机号 -->
    <input-group
      type="number"
      v-model="phone"
      placeholder="手机号"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btn-click="getVerifyCode()"
    />
    <!-- 验证码 -->
    <input-group
      type="number"
      v-model="varifyCode"
      placeholder="验证码000000"
      :error="errors.code"
    />
    <!-- 用户服务协议 -->
    <div class="logi_des">
      <p>
        新用户登录即自动注册,表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <!-- 登录按钮-->
    <div class="login_btn">
      <button :disabled="isClick" @click="login()">登录</button>
    </div>
  </div>
</template>

<script>
import InputGroup from "../components/InputGroups";
export default {
  name: "login",
  data() {
    return {
      phone: "",
      varifyCode: "",
      errors: {},
      btnTitle: "获取验证码",
      disabled: false,
    };
  },
  methods: {
    getVerifyCode() {
      if (this.validatePhone()) {
        this.validateBtn();
        //发送网络请求
      }
    },
    validateBtn() {
      var time = 10;
      let timer = setInterval(() => {
        this.disabled = true;
        if (time == 0) {
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.disabled = false;
        } else {
          //倒计时
          time--;
          this.btnTitle = time + "秒后重新获取";
          this.disabled = true;
        }
      }, 1000);
    },
    validatePhone() {
      //验证手机号码
      if (!this.phone) {
        this.errors = {
          phone: "手机号码不能为空",
        };
        return false;
      } else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: "请填写正确手机号码",
        };
        return false;
      } else {
        this.errors = {};
        return true;
      }
    },
    login() {
      //取消错误提醒
      this.errors = "";
      //发送请求
      if (this.varifyCode == "000000") {
        //设置登录状态,并且跳转页面
        localStorage.setItem("ele_login", true);
        this.$router.push("/");
      } else {
        this.errors = {
          code: "验证码有误请重输入",
        };
      }
    },
  },
  computed: {
    isClick() {
      if (!this.phone || !this.varifyCode) return true;
      else return false;
    },
  },
  components: {
    InputGroup,
  },
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  text-align: center;
}
.logo img {
  width: 80%;
  margin-bottom: 15px;
}

.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  border: none;
  outline: none;
}
.login_btn button[disabled] {
  background-color: #79df8f;
}
.logi_des {
  margin: 10px 0;
  font-size: 12px;
}
.logi_des span {
  color: rgb(55, 128, 238);
}
</style>
