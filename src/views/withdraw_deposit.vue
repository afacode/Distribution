<template>
  <div class="withdraw">
    <div class="color-white">
      <p class="withdraw-title">提现金额</p>
      <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
              <div class="weui-cell__hd"><label class="weui-label">￥</label></div>
              <div class="weui-cell__bd">
                  <input ref="money" class="weui-input" type="number" @keyup="validateMax" pattern="[0-9]*" placeholder="请输入金额">
              </div>
          </div>
      </div>
      <p class="all-num-p"><span class="all-num">账户余额￥{{moneyNum}}，</span> <span @click="getNumToInput" class="all-num-color">全部提现</span></p>
      <a href="javascript:;" class="weui-btn weui-btn_primary" v-bind:class="[button_click ? '' : 'weui-btn_disabled']" @click="toRecharge">提现</a>
    </div>
  </div>
</template>

<style scoped>
.withdraw{
    margin: .15rem .16rem;
    background-color: #fff;
    padding: .2rem .1rem;
}
.withdraw .weui-cells:before {
  display: none;
}
.all-num {
  color:#999999;
  font-size:.12rem;
}
/* .color-white{
  background:#fff;
} */
.withdraw-title{
  font-size: .17rem;
  line-height: .25rem;
}
.weui-cells{
  background-color: none;
}
.weui-label{
  width:.25rem;
}
.all-num-p{
  margin:.08rem 0;
}
.all-num-color{
  color:#5e7199;
}
</style>


<script>
import axios from 'axios';
import { MessageBox } from 'mint-ui';
export default {
  data(){
    return{
      userId:null,
      moneyNum:0,
      boba_wechat_id:null,
      button_click:true
    }
  },
  created(){
    this.shareWx.disableShare();
    this.boba_wechat_id=this.getCookie("boba_wechat_id");
    if(!this.boba_wechat_id){
       window.location.href = "/admin/boba/wechat/login?originUrl="+encodeURIComponent(document.location.protocol+'//'+window.location.host+'/#'+this.$route.fullPath);
    }
    if(this.boba_wechat_id && this.boba_wechat_id !== ''){
      axios.get(`/api/accounts/${this.boba_wechat_id}`)
      .then(response=>{
        this.moneyNum = response.data.balance;  
        // this.balanceFreeze = response.data.balanceFreeze;
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
    // 余额全部提现
    getNumToInput(){
      this.$refs.money.value = this.moneyNum;
    },
    validateMax(e){
      if(e.target.value>=this.moneyNum){
        this.$refs.money.value = this.moneyNum;
      }
    },
    //提现按钮
    toRecharge(){
      var _self =this;
      let moneyOut = this.$refs.money.value;
      if(moneyOut < 1){
        return MessageBox({
                title: '提示',
                message: '提现金额最小为1元'
            });
      }
      // console.log(this.moneyOut);
      let isNum = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/ ;
      if(isNum.test(moneyOut)){
        this.button_click = false;
        axios.post('/api/weChat/transfe',{userId:this.boba_wechat_id, cash:moneyOut*100})
        .then(response=>{
          if(response.data =="200"){
            MessageBox({
                title: '提示',
                message: '提现成功'
            });
            _self.button_click = true;
            _self.$router.push('/account');
          }else{
            MessageBox({
                title: '提示',
                message: '提现失败'
            });
            _self.button_click = true;
          }
        })
        .catch(error=>{
          console.log(error)
        })
      }else{
        return MessageBox({
            title: '提示',
            message: '请输入正确金额'
          });
      }
    },
    validateMoney(e){
      /**@augments
     * 充值金额校验
     * /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
     * /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
     * /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/
     */
      let isNum = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/ ;
      let isPoint = /(^[0-9]+(.){1}\d{1,2}$)/;
      if(isNum.test(e.target.value)){
        // console.log(e.target.value)  
      }else{ 
        e.target.value = e.target.value.substr(0, e.target.value.length - 1);
        validateMoney(e);
      }
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

