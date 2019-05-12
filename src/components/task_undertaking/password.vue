<template>
   <div>

   </div>
</template>
<style>
.tips {
  padding-bottom: 0.1rem;
}

</style>

<script>
import { MessageBox ,Toast} from "mint-ui";
import { checked } from "@/api/task_undertaking";
export default {
  data() {
    return {
      isShadow: true,
      passwords: ""
    };
  },
  created() {
      this.alertConfim();
  },
  methods: {
      alertConfim(){
          MessageBox.prompt('请输入4位密码','',{showCancelButton:false,closeOnClickModal:false}).then(({ value, action }) => {   
              console.log(action,'test')
              if(!value||value.length!=4){
                  this.alertConfim();
              }
              this.passwords=value;
              this.confirmPassword();

        });
      },
    regPassword() {},
    confirmPassword() {
      this.$emit("setPswd", this.passwords);
      this.checkedPassword();
    },
    checkedPassword() {
        var _self=this;
        checked({ password: this.passwords, promotionId: this.$route.query.promotionId })
        .then(res => {
            if(!res.data){
                MessageBox.alert('密码错误').then(action => {
                   
                    _self.alertConfim();
                });
               
             Toast('密码验证成功',1000)
               
               
            }
        })
        .catch(error => {
             Toast(error.response.data.message,1000);
             setTimeout(function(){
                  _self.alertConfim();
             },1100)
        });
    
    }
  }
};
</script>
