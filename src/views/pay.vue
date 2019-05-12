<template>
<div class="pay">
  <div class="pay-display">
    <p class="pay-text">支付订单</p>
    <p class="pay-number"><span>￥</span>{{ cash }}</p>
  </div>
  <div class="weui-cells__title">
    <span>收款方</span><span class="pay-company">**************</span>
  </div>
  <div class="pay-transaction">
    <a href="javascript:" class="weui-btn weui-btn_primary" @click="pushpay">立即支付</a> 
  </div> 
  
</div>
</template>

<script>
import axios from 'axios';
import { MessageBox } from 'mint-ui';
export default {
  data(){
    return{
      userId:null,
      cash:0.01,
      centCash:1,
      boba_wechat_id:null,
      wechat:null
    }
  },
  created(){
    this.shareWx.disableShare();
    this.cash = this.$route.params.cash;
    this.boba_wechat_id=this.getCookie("boba_wechat_id");
    if(!this.boba_wechat_id){
       window.location.href = "/admin/boba/wechat/login?originUrl="+encodeURIComponent(document.location.protocol+'//'+window.location.host+'/#'+this.$route.fullPath);
    }
    this.boba_wechat_id=this.getCookie("boba_wechat_id");
   
  },
  methods:{
    pushpay(){
      this.centCash = this.cash*100;
      var _self = this;
      axios.post('/api/weChat/unifiedOrder',{userId:this.boba_wechat_id,cash:this.centCash})
       .then(response=>{
          this.wechat={
            appId:response.data.appId,
            nonceStr:response.data.nonceStr,
            packages:response.data.packages,
            paySign:response.data.paySign,
            prepayId:response.data.prepayId,
            timeStamp:response.data.timeStamp,
            signType:response.data.signType
          }
          _self.onBridgeReady()
      })
      .catch(error=>{
           return MessageBox({
            title: '提示',
            message: '查询出错'
          });
      })
    },
    // 微信自己的
    onBridgeReady(){
      var _self = this; 
      WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
              "appId":_self.wechat.appId,     //公众号名称，由商户传入     
              "timeStamp":_self.wechat.timeStamp,         //时间戳，自1970年以来的秒数     
              "nonceStr":_self.wechat.nonceStr, //随机串     
              "package":_self.wechat.packages,     
              "signType":"MD5",         //微信签名方式：     
              "paySign":_self.wechat.paySign //微信签名 
          },
          function(res){
            // alert(JSON.stringify(res));     
              if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                window.location.href = (document.location.protocol+'//'+window.location.host);
              }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
              if(res.err_msg == "get_brand_wcpay_request:cancel" ){
                return MessageBox({
                  title: '提示',
                  message: '支付过程中用户取消'
                });
              }
              if(res.err_msg == "get_brand_wcpay_request:fail" ){
                return MessageBox({
                  title: '提示',
                  message: '支付失败'
                });
              }
              
          }
      ); 
      // if(typeof WeixinJSBridge == "undefined"){
      //   if( document.addEventListener ){
      //       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      //   }else if (document.attachEvent){
      //       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
      //       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      //   }
      // }else{
      //   onBridgeReady();
      // }
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
  .pay{
    margin-top:.2rem;
  }
  .pay .pay-display{
    text-align:center;
    color:#050505;
  }
  .pay .pay-text{
    font-size: .15rem;
    line-height: .22rem;
  }
  .pay .pay-number{
    font-size:.36rem;
  }
  .weui-cells__title{
    /* margin:0 .15rem; */
    position: relative;
    height: 0.46rem;
    line-height: .46rem;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .pay-company{
    position: absolute;
    right:.22rem;
    
  }
  .pay-transaction{
    margin-top:.18rem;
    padding:0 .15rem;
  }

</style>



