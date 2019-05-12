<template>
<div class="recharge">     
  <div class="moneyBox">
        <p class="recharge-title">充值金额</p>
      <div class="recharge-number">
          <div class="weui-flex">
              <a href="javascript:;" class="weui-flex__item flex__item-margin-right weui-btn weui-btn_plain-default" @click="changeMoney(0, $event)" v-bind:class="{ 'weui-btn_warn': moneyTpe==0}">1元</a>
              <a href="javascript:;" class="weui-flex__item flex__item-margin-left weui-btn weui-btn_plain-default" @click="changeMoney(1, $event)"  v-bind:class="{ 'weui-btn_warn': moneyTpe==1}" >2元</a>
          </div>
          <div class="weui-flex">
              <a href="javascript:;" class="weui-flex__item flex__item-margin-right weui-btn weui-btn_plain-default"  @click="changeMoney(2, $event)"  v-bind:class="{ 'weui-btn_warn': moneyTpe==2}">3元</a>
              <a href="javascript:;" class="weui-flex__item flex__item-margin-left weui-btn weui-btn_plain-default" @click="changeMoney(3, $event)"  v-bind:class="{ 'weui-btn_warn': moneyTpe==3}">4元</a>
          </div>
          <div class="weui-cells">
              <div class="weui-cell">
                  <div class="weui-cell__bd">
                      <input ref="money" type="number" @keyup="validateMax" max="50000" min="0.01" class="weui-input" placeholder="输入金额">
                      <!-- @keyup="validateMoney" @focusout="focusout" @focus="hideConfirm" @blur="showConfirm(value)" -->
                  </div>
              </div>  
          </div>    
      </div>
  </div>
  <div class="recharge-pay-way">
      <i class="weui-icon-success"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 微信 <i class="weui-icon-success-color weui-icon-success"></i>
  </div>   
  <div class="recharge-click" ref="confirm">
      <p class="recharge-protocol">点击充值，即代表阅读并同意充值协议</p>
      <a href="javascript:;" class="recharge-click-text weui-btn weui-btn_primary" @click="toRechargeWePay">充值</a> 
  </div>   
</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      moneyTpe: 0,
      moneyNum:1,
      boba_wechat_id:null,  
      screenWidth: document.body.clientWidth
    };
  },
  created(){ 
    this.shareWx.disableShare();
    this.boba_wechat_id=this.getCookie("boba_wechat_id");
    if(!this.boba_wechat_id){
       window.location.href = "/admin/boba/wechat/login?originUrl="+encodeURIComponent('http://'+window.location.host+'/#'+this.$route.fullPath);
    }
  },
  mounted(){
    var windowInnerHeight = window.innerHeight;
    var _self = this;
    window.addEventListener('resize', function(){ 
      if(window.innerHeight < windowInnerHeight){
           _self.$refs.confirm.style.display='none'; 
        }else{
          _self.$refs.confirm.style.display='block'; 
        }
    })
  },
  computed:{
  },
  updated(){
  },
  methods: {
    changeMoney(n, e) {
      this.moneyTpe = n;
      this.moneyNum = e.target.innerHTML.replace(/[^0-9]/ig,"");
    },
    hideConfirm(){
      // 获取焦点 visibility hidden  display  none
      // this.$refs.confirm.style.display='none';
    },
    showConfirm(){
      // this.$refs.confirm.style.display='block';
    },
    focusout(){
      // this.$refs.confirm.style.display='block';
    },
    validateMax(e){
      if(e.target.value>=50000){
        this.$refs.money.value = 50000;
      }
    },
    // 提交金额确认
    toRechargeWePay(e) {
      // 获取金额   userId:this.$store.getters.userId,
      let isNum = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/ ;
      if(this.$refs.money.value && !isNum.test(this.$refs.money.value)){
        return MessageBox({
            title: '提示',
            message: '请输入正确金额'
          });
      }
      let moneyNum = (this.$refs.money.value) ? this.$refs.money.value : this.moneyNum;
      if(Number.isInteger(moneyNum)){
        moneyNum = parseFloat(moneyNum + '.00');
      }
      // params query params：this.$route.params.name;   query:this.$route.query.name
      if(isNum.test(moneyNum)){
        this.$router.push({name:'Pay',params:{cash:moneyNum}})
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
<style scoped>
.recharge {
}
.recharge .moneyBox {
  /* background: #fff; */
  padding: 0 0.15rem;
}
/* 充值数额面板 */
.recharge-title {
    padding: .3rem 0 .04rem 0;
    font-size: .16rem;
}
.weui-flex__item {
  margin-top: 0.1rem;
}
.flex__item-margin-right {
  margin-right: 0.06rem;
}
.flex__item-margin-left {
  margin-left: 0.06rem;
}
/* 支付方式 */
.recharge-pay-way {
  position: relative;
  margin-top: 0.3rem;
  padding:.15rem;
  background-color: #fff;
}
.weui-icon-success-color {
  position: absolute;
  right: .15rem;
  color: red;
}
/* 充值按钮 */
.recharge-click {
  position: absolute;
  width: 100%;
  bottom: 0.2rem;
  /* z-index:-1; */
}
.recharge-protocol {
  margin-bottom: 0.2rem;
  margin-right: 0.25rem;
  text-align: center;
  color: #576b95;
}
.recharge-click-text {
  display: block;
  margin:0 .15rem;
}
.weui-btn_plain-default.weui-btn_warn {
  color: #fff;
}
</style>

