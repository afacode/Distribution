<template>
	<div class="supplement-c">
		<div class="weui-cells weui-cells_form">
            <div class="weui-cell ">
                <div class="weui-cell__hd"><label class="weui-label">任务名</label></div>
                <label class="weui-label task-name">{{task.name}}</label>
            </div>
        </div>
        <div class="weui-cells__title preview-btn">任务剩余浏览量{{task.viewLimit-task.viwes}}</div>
		<div class="weui-cells weui-cells_form">
            <div class="weui-cell ">
                <div class="weui-cell__hd"><label class="weui-label">追加浏览量</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" @keyup="validate"  v-model="scanNum" :max="recharge/task.viewUnitPrice | parseInt"  placeholder="输入追加浏览量"/>
                </div>
                <label class="weui-label task-count">次</label>
            </div>
        </div>
        <div class="total-amount-count-c">
        	<div class="weui-cells__title remaind-c">账户剩余可用余额¥{{recharge}}</div>
        	<div class="weui-cells__title max-num-c">最大可追加{{recharge/task.viewUnitPrice | parseInt}}次浏览量</div>
        	<router-link to="/recharge" tag="div" class="to-charge-page">
        		充值
        	</router-link>
        </div>
        <div class="weui-cells__title ">
	        <div class="page-create-btn-c ">
	        		<span @click="addNum"   v-bind:class="['weui-btn weui-btn_primary',{'weui-btn_disabled':isDisable}]">补充</span>
	   		</div>
        </div>
        <div id="dialogs" v-show="showFlag">
	        <!--BEGIN dialog2-->
	        <div class="js_dialog" id="iosDialog2" style="display: none;" v-show="showFlag">
	            <div class="weui-mask" @click="hide"></div>
	            <div class="weui-dialog">
	            	<div class="weui-dialog__hd">追加成功</div>
	                <div class="weui-dialog__bd">成功追加{{scanNum}}次浏览量任务<br>{{task.name}}</div>
	                <div class="weui-dialog__ft">
	                	<router-link :to="/taskdetail/+task.id" tag="a" class="weui-dialog__btn weui-dialog__btn_primary">
	                		返回任务详情
	                	</router-link>
	                </div>
	            </div>
	        </div>
	        <!--END dialog2-->
	    </div>
	</div>
</template>

<script>
	import {getTaskDetail} from "@/api/task";
	import {account as getAccount} from "@/api/account";
	import {addScanNum } from "@/api/task";
	export default {
  		data(){
  			return{
  				recharge:2000,
  				scanNum:"",
  				task:{},
  				isDisable:true,
  				showFlag:false,
  			    wechat_id:''
  			}
		  },
		  created(){
			  this.shareWx.disableShare();
		  },
  		mounted(){
  			this.wechat_id=this.getCookie("boba_wechat_id");
  			this.getRecharge();
  			this.getTask(this.$route.params.id);
  		},
  		methods:{
  			hide:function(){
  				this.showFlag = false;
  			},
  			addNum:function(){
  				let flag = this.validate();
  				if(flag){
  					addScanNum({id:this.task.id,viewLimit:this.scanNum})
  					.then((res)=>{
  						this.showFlag= true;
  					},(err)=>{
  						
  					})
  				}
  			},
  			validate:function(){
				if(this.scanNum == 0 || this.scanNum >(this.recharge/this.task.viewUnitPrice)){
					this.isDisable =  true;
					return false;
				}
				this.isDisable =  false;
				return true;
			},
  			getRecharge:function(){
				getAccount(this.wechat_id)
				.then((res)=>{
					this.recharge = res.data.balance
				},(err)=>{
				})
				
			},
  			getTask:function(id){
		  		getTaskDetail(id)
		  		.then((res)=>{
		  			this.task = res.data
		  		},(err)=>{
		  			
		  		})
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

<style>
	.total-amount-count-c{
		color:#c4c4c4;
		position: relative;
	}
	.to-charge-page{
		position: absolute;
		color:#e44f2a;
		font-size:14px;
		right: 1em;
		top:.6em
	}
	.task-name{
		width:60%;
	}
</style>