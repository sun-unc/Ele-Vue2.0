<template>  
  <div class="addAddress">
    <Header :title=title :isLeft="isLeft" />
    <!-- 添加地址 -->
    <div class="viewbody">
      <div class="content">
        <form-block v-model="addressInfo.name" label="联系人" placeholder="姓名" :tags="sexes" :sex="addressInfo.sex" @checkSex="checkSex" />
        <form-block v-model="addressInfo.phone" label="电话" placeholder="手机号码"/>
        <form-block v-model="addressInfo.address" label="地址" placeholder="小区/写字楼/学校等" icon="angel-right" @click="showSearch = true"/>
        <form-block v-model="addressInfo.bottom" label="门牌号" placeholder="10号楼5单元404" icon="edit" textarea="textarea"/>
        <div class="formblock">
          <div class="label-wrap">标签</div>
          <tab-tag :tags="tags" :selectTag="addressInfo.tag " @check-tag="checkTag" />
        </div>
      </div>
    </div>
    <!-- 确定按钮 -->
    <div class="form-button-wrap">
      <button @click="handleSave" class="form-button">确定</button>
    </div>
    <!-- 搜索地址 -->
    <address-search :showSearch="showSearch" @close="showSearch=false" :addressInfo="addressInfo" />
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import AddressSearch from "../../components/Orders/AddressSearch"
import TabTag from "../../components/Orders/TabTag"
import Header from "../../components/Header"
import FormBlock from "../../components/Orders/FormBlock"
export default {
  name: "AddAddress",
  data() {
    return {
      title: "",
      isLeft: true,
      tags: ["家", "学校", "公司"],
      sexes:["先生", "女士"] ,
      addressInfo: {},
      showSearch: false
    }
  },
  components: {
    Header,
    FormBlock,
    TabTag,
    AddressSearch,
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.addressInfo = to.params.addressInfo;
      vm.title = to.params.title
    })
  },
  methods:{
    checkTag(item) {
      // console.log(item);
      this.addressInfo.tag = item
    },
    checkSex(item) {
      this.addressInfo.sex = item
    },
    handleSave() {
      if(!this.addressInfo.name) {
        this.showMsg("请输入联系人")
        return;
      }
      if(!this.addressInfo.phone) {
        this.showMsg("请输入手机号码")
        return;
      }if(!this.addressInfo.address) {
        this.showMsg("请输入收货地址")
        return;
      }
      // 存储数据
      this.addAddress();
    },
    showMsg(msg) {
      Toast({
        message: 'msg',
        position: 'bottom',
        duration: 2000
      });
    },
    addAddress() {
      this.$axios.post('/api/user/add_address/5f9f837d99b90300175587d0', this.addressInfo)
      .then( res => {
        if (!this.$store.getters.userInfo) {
          this.$store.dispatch("setUserInfo", this.addressInfo)
        }
        this.$router.push("myAddress")
      })
      .catch( err => console.log(err))
    }
  }
}
</script>

<style scoped>
/* .addAddress {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
} */
.viewbody {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

.content {
  padding-left: 4vw;
  background: #fff;
  font-size: 0.94rem;
}

.formblock {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
}
.formblock .label-wrap {
  flex-basis: 17.333333vw;
  padding: 3.733333vw 0;
  line-height: 4.8vw;
  color: #333;
  font-weight: 700;
}

/* 确定按钮 */
.form-button-wrap {
  padding: 5.333333vw 4vw;
  display: flex;
}
.form-button-wrap .form-button {
  background: #00d762;
  text-align: center;
  border-radius: 0.533333vw;
  flex: 1;
  font-size: 1.1rem;
  line-height: 5.066667vw;
  color: #fff;
  padding: 3.333333vw 0;
  border: none;
  outline: none;
  font-weight: 500;
}
</style>