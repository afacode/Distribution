<template>
  <div class="trading_flow">
    <ul>
      <li class="trading_flow-li weui-flex" v-for="singleTrading in dataTrading">
        <div class="weui-flex__item trading_flow-detail">
          <p class="detail-title">{{singleTrading.recordName}}</p>
          <p class="detail-datetime">{{singleTrading.time}}</p>
        </div>
        <div class="weui-flex__item trading_flow-amount ">
          <p class="amount-number-1" v-if="singleTrading.totalPrice>=0">+{{singleTrading.totalPrice}}</p>
          <p class="amount-number" v-else>{{singleTrading.totalPrice}}</p>
          <!-- v-bind:style="{ color:#41993f }" -->
        </div>
        <br>
      </li>
      
    </ul>
    <p v-if="!dataTrading" class="no-data">没有数据</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return{
      dataTrading:null,
      boba_wechat_id:null
    }
  },
  created(){
    this.shareWx.disableShare();
    // this.userId = this.$store.getters.userId
    this.boba_wechat_id=this.getCookie("boba_wechat_id");
    if(!this.boba_wechat_id){
       window.location.href = "/admin/boba/wechat/login?originUrl="+encodeURIComponent(document.location.protocol+'//'+window.location.host+'/#'+this.$route.fullPath);
    }
    axios.get('/api/accounts/publisherFlowWater',{params:{userid:this.boba_wechat_id,time:'2'}})
    .then(response=>{
      // this.total = response.data.total;
      this.dataTrading = response.data;
    })
    .catch(error=>{
      console.log(error)
    })
    // 上拉刷新
    var screenHeight = window.screen.height;
    document.body.addEventListener("touchend", function(e){
      if(screenHeight + document.body.scrollTop >= document.body.scrollHeight){
        setTimeout(()=>{
          _self.getNewData()
        })
      }
    })
  },
  methods:{
    getNewData(){
      axios.get('/api/accounts/publisherFlowWater',{params:{userid:234,time:'2'}})
      .then(response=>{
        // this.total = response.data.total;
        this.dataTrading =response.data[0].waterRecord;
      })
      .catch(error=>{
        console.log(error)
      })
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
.trading_flow{
  background-color: #fff;
}
.trading_flow-li{
  padding-top:.15rem;
  height: .6rem;
  border-bottom:1px solid #bbbbbb;
}
.trading_flow-detail{
  margin-left:.16rem; 
  flex:2;
  overflow: hidden; 
  text-overflow: ellipsis;
   white-space:nowrap;
}
.detail-title{
  font-size: .17rem;
  line-height:.25rem; 
  overflow: hidden; 
  text-overflow: ellipsis;
   white-space:nowrap;
}
.detail-datetime{
  line-height: .2rem;
  color:#bbbbbb;
}
/* 右侧金额 */
.trading_flow-amount{
  margin-right:.12rem;
  flex:1;
}
.amount-number{
  line-height: .44rem;
  font-size: .2rem;
  text-align: right;
}
.amount-number-1{
  line-height: .44rem;
  font-size: .2rem;
  text-align: right;
  color:#41993f;
  
}

.no-data{
  margin-top: .2rem;
  text-align: center;
}
</style>


