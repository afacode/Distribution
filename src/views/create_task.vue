<template>
	<div class="task-content">
		<div class="weui-cells__title" style="padding-top:.3em"></div>
		<div class="weui-cells weui-cells_form">
            <div class="weui-cell task-name-c">
                <div class="weui-cell__hd"><label class="weui-label">任务名</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" @keyup="validate" v-model="taskName" type="text"  placeholder="输入任务名称"/>
                </div>
            </div>
            <div class="weui-cell task-name-c">
                <div class="weui-cell__hd"><label class="weui-label">活动链接</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" @keyup="validate"   type="url" v-model="taskURL"  placeholder="输入活动链接"/>
                </div>
            </div>
        </div>
		<div class="weui-cells__title preview-btn">点击查看任务页面预览</div>
        <div class="weui-cells weui-cells_form task-list">
        	<div class="weui-cells__title set-title">设置奖励金额</div>
            <div class="weui-cell">
                <div class="reward-list-c"> 
                	 <span  v-for="(item,index) in amount" @click="setAmount(index,item)"  v-bind:class="['weui-btn weui-btn_primary',{'current':currentId == index}]">{{item}}元/次</span>
                </div>
            </div>
           
        </div>
		<div class="weui-cells__title "></div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell ">
                <div class="weui-cell__hd"><label class="weui-label">设置浏览量</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number"  @keyup="validate" v-model="scanNum" :max="recharge/rewardMoney | parseInt"  placeholder="输入任务浏览量"/>
                </div>
                <label class="weui-label task-count">次</label>
            </div>
        </div>
        <div class="total-amount-count-c">
        	<div class="weui-cells__title remaind-c">剩余可用余额 ¥ {{recharge}}</div>
        	<div class="weui-cells__title max-num-c">最大可输入{{recharge/rewardMoney | parseInt}}次浏览量</div>
        	<router-link to="/recharge" tag="div" class="to-charge-page">
        		充值
        	</router-link>
        </div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell ">
                <div class="weui-cell__hd"><label class="weui-label">设置密码</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input"  @keyup="validate" type="text" pattern="[0-9]{4}" v-model="pwd"  placeholder="输入4位任务密码" maxlength="4"/>
                </div>
            </div>
        </div>
        <div class="weui-cells__title ">
	        <div class="page-create-btn-c ">
	        		<span  @click="createTask" class="weui-btn weui-btn_primary" v-bind:class="['weui-btn weui-btn_primary',{'weui-btn_disabled':isDisable}]">创建并发布</span>
	   		</div>
	   		
        </div>
        <div class="weui-mask" v-show="recharge<=0" id="iosMask" style="opacity: 0;"></div>
       <div v-show="recharge<=0" class="weui-actionsheet weui-actionsheet_toggle" id="iosActionsheet" style="opacity: 0;">
               <div class="weui-cells__title">    你尚无可用账户余额，暂时无法发布任务
               	<router-link to="/recharge">
               		<a href="javascript:;" @click="validate" class="weui-btn weui-btn_mini weui-btn_default recharge">充值</a>
               	</router-link>
               </div>
        </div>
	</div>
</template>
<style scoped="scoped">
	.weui-cells{
		margin-top:0px;
	}
	.weui-cells__title{
		padding-top:.77em;
		margin-top:0;
		padding-bottom:.3em;
	}
	.preview-btn{
		color:#576b95;
		font-size:.14rem;
	}
	.task-count{
		width:20px;
	}
	.total-amount-count-c{
		color:#c4c4c4;
		position: relative;
	}
	.page-create-btn-c{
		padding:0 15px;
		/*padding-top:.2rem;*/
	}
	.remaind-c{
		margin-bottom: 0;
	}
	.max-num-c{
		padding-top:0;
	}
	.set-title{
		color: inherit;
		line-height: inherit;
		font-size: 17px;
	}
	.task-list .weui-cell:before{
		border-top:none;
	}
	.task-list .weui-cell{
		padding: 0;
		margin:10px 15px;
	}
	.reward-list-c span{
		display: inline-block;
		width:48%;
		text-align: center;
		border-radius:0 ;
		border:#000;
		background:#ccc;
	}
	.reward-list-c span:nth-child(even){
		float:right;
	}
	.reward-list-c span:nth-child(odd){
		float:left;
	}
	.reward-list-c .weui-btn{
		margin-bottom:10px;
		margin-top:0px;
	}
	.reward-list-c .weui-btn:after{
		border-radius: 0;
	}
	.reward-list-c  .current{
		border: #e51c23;
		background: #e64e1e;
		color: #fff;
	}
	.reward-list-c  .normal{
		border:#bbb;
		background:#eeedee;
		color: #bbb;
	}
	.reward-list-c .weui-btn_primary:not(.weui-btn_disabled):active{
	  color: #fff;
	  background-color:#e64e1e;
	  border: #e51c23;
	}
	.weui-actionsheet{
		top:0px;
		height:.5rem;
		background:#e64340;
		
	}
	.weui-actionsheet .weui-cells__title{
		color:#fff;
		font-size: 14px;
		padding-top: 1em;
	}
	.weui-actionsheet .recharge{
		border:1px solid #fff;
		background: transparent;
		color:#fff;
		float: right;
		margin-top: -.03rem;
	}
	.to-charge-page{
		position: absolute;
		color:#e44f2a;
		font-size:14px;
		right: 1em;
		top:.6em
	}
</style>
<script>
	import {doCreateTask} from "@/api/task";
	import {account as getAccount} from "@/api/account";
	import { MessageBox } from 'mint-ui';
	export default {
		
		data(){
			return{
				amount:[0.2,0.3,0.5,1,2,5],
				currentId:0,
				rewardMoney:0.2,
				recharge:0,
				taskName:"",
				scanNum:null,
				pwd:null,
				isDisable:true,
				taskURL:"",
				wechat_id:""
			}
		},
		created(){
			this.shareWx.forbidden();
		     this.wechat_id=this.getCookie("boba_wechat_id");
		    if(!this.wechat_id){
		       window.location.href = "/admin/boba/wechat/login?originUrl="+encodeURIComponent('https://'+window.location.host+'/#'+this.$route.fullPath);
		    }
		    this.wechat_id=this.getCookie("boba_wechat_id");
			this.getRecharge();
			
		},
		mounted(){

			this.shareWx.disableShare();
		},
		methods:{
			getRecharge:function(){
				if(this.wechat_id!=null && this.wechat_id!=""){
					getAccount(this.wechat_id)
					.then((res)=>{
						this.recharge = res.data.balance;
						if(this.recharge == 0){
							document.getElementById('iosMask').style.opacity = 1;
							document.getElementById('iosActionsheet').style.opacity = 1;
							
						}
					},(err)=>{
					})
				}
				
				
			},
			createTask:function(){
				let flag = this.validate();
				if(flag){
					doCreateTask({createBy:this.wechat_id,name:this.taskName,originUrl:this.taskURL,password:this.pwd,viewLimit:this.scanNum,viewUnitPrice:this.rewardMoney})
					.then((res)=>{
						this.$router.push({path:'/publish/'+res.data});
					},(err)=>{
						return MessageBox({
				            title: '提示',
				            message: '创建失败'
				          });
					});
				}
			},
			setAmount:function(index,item){
				this.currentId = index;
				this.rewardMoney = item;
				this.validate();
			},
			validate:function(){
				if(this.taskName == ""){
					this.isDisable =  true;
					return false;
				}
				if(!(new RegExp('(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]')).test(this.taskURL)){
					this.isDisable =  true;
					return false;
				}
				if(this.scanNum == 0 || this.scanNum >(this.recharge/this.rewardMoney)){
					this.isDisable =  true;
					return false;
				}
				if(!(/^\d{4}$/gi.test(this.pwd))){
					this.isDisable =  true;
					return false;
				}
				this.isDisable =  false;
				return true;
			},
			// 微信自己的
		    onBridgeReady(){
		      WeixinJSBridge.invoke(
		          'getBrandWCPayRequest', {
		              "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入     
		              "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
		              "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
		              "package":"prepay_id=u802345jgfjsdfgsdg888",     
		              "signType":"MD5",         //微信签名方式：     
		              "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
		          },
		          function(res){     
		              if(res.err_msg == "get_brand_wcpay_request:ok" ) {
		                this.$router.push('/')
		              }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
		          }
		      ); 

		    },
		    getCookie(name) {
		      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		      if(arr=document.cookie.match(reg)){
		        return unescape(arr[2]);
		      }else{
		        return null;
		      }      
		    }
		}
	}
</script>