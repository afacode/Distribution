<template>
<div class="account">
  <div class="account-display">
    <p class="account-text">账户余额</p>
    <p class="account-number"><span>￥</span>{{balance}}</p>
  </div>
  <router-link to="/trading_flow">
    <p class="account-detail">明细</p>
  </router-link>
  <div class="account-transaction">
    <a href="javascript:;" class="weui-btn weui-btn_primary" @click="toRecharge">充值</a> 
    <a href="javascript:;" class="weui-btn weui-btn_default" @click="toWithdraw">提现</a>
  </div> 
  
</div>
</template>

<script>
import axios from 'axios';
import { MessageBox } from 'mint-ui';
export default {
  data(){
    return{
      balance:0,
      balanceFreeze:0,
      boba_wechat_id:null,
    }
  },
  beforeCreate(){
    // 微信授权
    // this.userId = this.$store.getters.userId
    
    
  },
  created(){
    this.shareWx.disableShare();
    this.boba_wechat_id=this.getCookie("boba_wechat_id");
    if(!this.boba_wechat_id){
       window.location.href = "/admin/boba/wechat/login?originUrl="+encodeURIComponent(document.location.protocol+'//'+window.location.host+'/#'+this.$route.fullPath);
    }
    if(this.boba_wechat_id && this.boba_wechat_id !==""){
      axios.get(`/api/accounts/${this.boba_wechat_id}`)
      .then(response=>{
        // if(response.code != 200){
        //   return MessageBox({
        //     title: '提示',
        //     message: '查询出错'
        //   });
        // }
        this.balance = response.data.balance;  
        this.balanceFreeze = response.data.balanceFreeze;
      })
      .catch(error=>{
           return MessageBox({
            title: '提示',
            message: '查询-出错'
          });
      })
    }
    
  },
  methods:{
    toRecharge(){
      this.$router.push({ path: '/recharge'})

    },
    toWithdraw(){
      this.$router.push({ path: '/withdraw_deposit'})
    },
    getCookie(name) {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
      }else{
        return null;
      }      
    }, 
  }
}
</script>

<style scoped>
  .account .account-display{
    margin:.42rem 0 .3rem 0;
    text-align:center;
    color:#050505;
  }
  .account .account-number{
    font-size:.36rem;
  }
  .account .account-detail{
    position:absolute;
    top:.2rem;
    right:.2rem;
    color:#474747;
  }
  .account-transaction{
    padding:0 .15rem;
  }

</style>

