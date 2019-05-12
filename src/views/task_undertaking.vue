<template>
  <div class="page-taskUndertask page">
    <div class="weui-cells__title">任务说明</div>
     <password @setPswd="setPassword" ></password>
      <task-list :taskDetails="taskDetails"></task-list>
      <div class="page__bd page__bd_spacing"><a href="javascript:;" class="weui-btn weui-btn_primary" @click="confrimTask">确认承接</a></div>  
  </div>
</template>
<style>
.page-taskUndertask .page__bd {
  margin: 20px 0;
  padding: 0 15px;
}
</style>

<script>

import { MessageBox ,Toast} from "mint-ui";
import taskList from "@/components/task_undertaking/list";
import password from "@/components/task_undertaking/password";
import { accept,promotions } from "@/api/task_undertaking";
export default {
  components: { taskList, password },
  data() {
    return {
      passwords: "",
      taskDetails:'',
      authorId:''
    };
  },
  created(){
    this.shareWx.disableShare();

  },
  mounted(){
    this.wxAuthor();//获取授权信息
    this.getPromotionDetails();
   
 
  },
  methods: {
    setPassword(passwords) {
      this.passwords = passwords;
    },
    getPromotionDetails(){
      var _self=this;   
     promotions(this.$route.query.promotionId)
          .then(res => {
            _self.taskDetails=res.data;
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
    confrimTask() {
      var _self=this;
     accept({ promotionId:this.$route.query.promotionId , spreaderId: this.authorId })
          .then(res => {  
            if(!res.data){
              return MessageBox('承接失败');

            }
            Toast('承接成功',1000);
            setTimeout(function(){
                _self.$router.push({path:'./task_spread?promotionId='+_self.$route.query.promotionId});
            },2000)
            
          })
          .catch(error => {
              Toast(error.response.data.message);
          
          });
    }
  }
};
</script>

