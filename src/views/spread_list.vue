<template>
<div class="page-taskList">
  <div class="weui-cells container">
    <div class="weui-cell" v-for="item in list">
      <div class="weui-cell__bd">
        <p class="tit">{{item.name}}</p>
        <p class="sm-brief">浏览量：{{item.views}}次</p>
        <p class="sm-brief">
          <span v-if="item.status=='结束'">已结束</span>
           <span v-if="item.status=='进行中'">进行中</span>
            <span v-if="item.status=='暂停'">已暂停</span>
        </p>
      </div>
      <div class="weui-cell__ft">
        <router-link :to="'/task_spread?promotionId='+item.id">
        <div class="btn"  v-if="item.status=='进行中'">传播赚钱</div>
        <!-- @click="goShare" -->
        </router-link>
        <p class="count" >
          <span v-if="item.totalProfit>0"> +{{item.totalProfit}}元</span>
          <span v-else>{{item.totalProfit}}元</span>
         
        </p>
        <p class="today"  v-if="item.status==1">
          <span>今天已收入</span>
          <span v-if="item.todayProfit>0"> +{{item.todayProfit}}元</span>
          <span v-esle> {{item.todayProfit}}元</span>
          
         
          </p>
      </div>
    </div>

  </div>
</div>

</template>
<style>
.page-taskList .container{
  margin-top:0;
}
.sm-brief {
  color: #999999;
  line-height: 1.5em;
}
.today,
.sm-brief {
  font-size: 0.14rem;
}
.page-taskList .tit {
  margin-bottom: 0.06rem;
  font-size: 0.18rem;
}
.page-taskList .btn {
  width: 1rem;
  background-color: #1aad19;
  border-radius: 0.02rem;
  color: #fff;
  text-align: center;
  line-height: 2em;
  float: right;
  margin-bottom: 0.04rem;
}
.weui-cell__ft .count {
  color: #1aad19;
}
</style>

<script>
import { MessageBox, Toast } from "mint-ui";
import { spreaderFlow } from "@/api/spreaderFlow";
export default {
  data() {
    return {
      list:[],
      taskId: "",
      authorId:''

    }
  },
  created() {
    this.shareWx.disableShare();

  },
  mounted(){
    this.wxAuthor();
    this.taskId = this.getURL(this);
    this.getList();
  },
  methods: {
    getURL: _vue => _vue.$route.params.id,
    getList() {
      spreaderFlow(this.authorId)
        .then(res => {
          
          if (!res.data) {
            return MessageBox("获取资金流水失败");
          }
          this.list=res.data;

        })
        .catch(error => {
          Toast(error.response.data.message);
        });
    },
       wxAuthor(){
       this.authorId=this.getAuthor.getCookie("boba_wechat_id"); 

       if(!this.authorId){
          this.getAuthor.goAuthor();

       }
    },
    goShare(){
      // this.$router.push({path:'./task_spread?promotionId='+_self.$route.query.promotionId});
      this.$router.push({path:'./task_spread?promotionId='+this.taskId});
    },
  }
};
</script>

