<template>
  <div class="task-detail-c">
  	<div class="page__bd">
        <div class="weui-cells">
            <div class="weui-form-preview">
	            <div class="weui-form-preview__hd">
	                <div class="weui-form-preview__item detail-title">
	                    <label class="weui-form-preview__label">{{task.name}}</label>
	                    <em class="weui-form-preview__value" v-bind:class="{'status-title-stop':task.status=='2','status-title-in':task.status=='1','status-title-end':task.status=='0'}">{{statusArr[task.status]}}</em>
	                </div>
	            </div>
	            <div class="weui-form-preview__bd">
	                <div class="weui-form-preview__item">
	                    <label class="weui-form-preview__label">任务总奖金 </label>
	                    <span class="weui-form-preview__value">¥{{task.price}}</span>
	                </div>
	                <div class="weui-form-preview__item">
	                    <label class="weui-form-preview__label">任务目标总浏览量 </label>
	                    <span class="weui-form-preview__value">{{task.viewLimit}}次</span>
	                </div>
	                <div class="weui-form-preview__item">
	                    <label class="weui-form-preview__label">目前浏览量</label>
	                    <span class="weui-form-preview__value">{{task.viwes}}次</span>
	                </div>
	                <div class="weui-form-preview__item">
	                    <label class="weui-form-preview__label">完成进度 </label>
	                    <span class="weui-form-preview__value">已完成{{task.viwes/task.viewLimit*100 | parseInt}}%</span>
	                </div>
	                <div class="weui-form-preview__item">
	                    <label class="weui-form-preview__label">承接人数 </label>
	                    <span class="weui-form-preview__value">{{task.undertakeAmount}}人</span>
	                </div>
	                <div class="weui-form-preview__item">
	                    <label class="weui-form-preview__label">创建日期</label>
	                    <span class="weui-form-preview__value">{{task.createDate}}</span>
	                </div>
	                <div class="weui-form-preview__item">
	                    <label class="weui-form-preview__label">任务密码</label>
	                    <span class="weui-form-preview__value" ><span id="pwd">{{task.password}}</span>&nbsp;
						            		<a href="javascript:;"  data-clipboard-target="#pwd" class="weui-btn weui-btn_mini weui-btn_primary copy-btn">复制</a>
	                    </span>
	                    
	                </div>
	            </div>
	        </div>
        </div>
    </div>
    <div  class="weui-cells__title preview-btn">预览转发页面</div>
    <div class="weui-panel__bd ">
        <div class="weui-cells task-publish-c ">
		        <div class="weui-media-box weui-media-box_small-appmsg ">
		        		<router-link tag="div" class="weui-cells" :to="/publish/+task.id">
		                <a class="weui-cell weui-cell_access " href="javascript:;">
		                    <div class="weui-cell__bd weui-cell_primary">
		                        <p>发布任务</p>
		                    </div>
		                    <span class="weui-cell__ft"></span>
		                </a>
		        		</router-link>
		        </div>
		    </div>
    </div>
    <div class="weui-cells__title ">
    		<router-link :to="/supplement/+task.id" tag="div" class="page-create-btn-c">
					<span  class="weui-btn weui-btn_primary" >追加目标浏览量</span>
				</router-link>
   			<a href="javascript:;" class="weui-btn weui-btn_plain-default" @click="operaStatus" id="operateStatusBtn">操作任务状态</a>
    </div>
    <div class="weui-mask" @click="cancelSheets" id="iosMask" v-show="showStatusSheet"></div>
    <div class="weui-actionsheet" id="iosActionsheet"  v-show="showStatusSheet">
        <div class="weui-actionsheet__menu">
            <div class="weui-actionsheet__cell" @click="operate(2)" v-show="2!=task.status">暂停任务</div>
            <div class="weui-actionsheet__cell close-task" @click="operate(0)" v-show="0!=task.status">结束任务</div>
            <div class="weui-actionsheet__cell" @click="operate(1)" v-show="1!=task.status">继续任务</div>
        </div>
        <div class="weui-actionsheet__action">
            <div class="weui-actionsheet__cell" @click="cancelSheets" id="iosActionsheetCancel">取消</div>
        </div>
    </div>
     <!--BEGIN toast-->
    <div id="toast" v-show="copySuccess">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-icon-success-no-circle weui-icon_toast"></i>
            <p class="weui-toast__content">密码复制成功</p>
        </div>
    </div>
    <!--end toast-->
    <div id="dialogs">
        <!--BEGIN dialog1-->
        <div class="js_dialog" id="iosDialog1" style="display: none;" v-show="optFlag">
            <div class="weui-mask" v-show="optFlag"></div>
            <div class="weui-dialog" v-show="optFlag">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{optTitle}}</strong></div>
                <div class="weui-dialog__bd">{{optDescribe}}</div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" @click="cancel" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
                    <a href="javascript:;" @click="confirm" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
                </div>
            </div>
        </div>
        <!--END dialog1-->
        
    </div>
     <!--BEGIN toast-->
    <div id="toast1" v-show="showFlag">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-icon-success-no-circle weui-icon_toast"></i>
            <p class="weui-toast__content">状态修改成功</p>
        </div>
    </div>
    <!--end toast-->
  </div>
</template>
<style scoped="scoped">
	#iosActionsheet{
		bottom:200px;
	}
	.task-publish-c{
		margin-top: 0;
	}
	.page-create-btn-c{
		margin-top:.3rem;
		margin-bottom:.2rem;
	}
	.detail-title label{
		color: #000;
	}
	.detail-title em{
		font-size:inherit;
	}
	.status-title-in{
		color:#26aa28;
	}
	.status-title-stop{
		color:#FFBE00;
	}
	.status-title-end{
		color:#888;
	}
	.copy-btn{
		float: right;
		border: 1px solid #1aad19;
		color:#1aad19;
		background:#fff;
	}
	.copy-btn:after{
		border:none
	}
	.preview-btn{
		color:#576b95;
		font-size:.14rem;
		padding-top:.77em;
		margin-top:0;
	}
	.close-task{
		color:rgb(229, 28, 35);
	}
</style>
<script>
	import Clipboard from 'clipboard';
	import {getTaskDetail} from "@/api/task"
	import {changeStatus} from "@/api/task"
	let _self;
export default {
	data(){
		return {
			showStatusSheet:false,
			copySuccess:false,
			task:{},
			statusArr:["已结束","进行中","暂停中"],
			optFlag:false,
			optTitle:"",
			optDescribe:"",
			status:-1,
			showFlag:false
		}
	},
	created(){
		this.shareWx.disableShare();
//		this.shareWx.forbidden();
//		this.shareWx.hideAllNonBaseMenuItem();
//  this.shareWx.hideOptionMenu();
	},
	mounted(){
		this.getTask(this.$route.params.id);
  	var  _self = this;
  	const clipboard = new Clipboard(".copy-btn");
  	clipboard.on('success', function(e) {
		    _self.copySuccess = true;
				setTimeout(function(){
					_self.copySuccess = false;
				},2000)
		    e.clearSelection();
		});
		
		clipboard.on('error', function(e) {
		});
  },
  methods:{
  	confirm:function(){
  		if(this.status !=-1){
  			_self = this;
  			changeStatus({id:this.task.id,status:this.status})
  			.then((res)=>{
	  				this.optFlag = false;
	  				this.showFlag = true;
	  				this.task.status = this.status;
	  				setTimeout(function(){
							_self.showFlag = false;
						},1000)
  			},(err)=>{
  				
  			})
  		}
  	},
  	cancel:function(){
  		this.optFlag = false;
  	},
  	operate:function(type){
  		if(type==2){
  			this.optTitle = "暂停任务";
  			this.optDescribe = "任务分享页面将不再展示，停止消耗任务剩余浏览量";
  		}else if(type==0){
  			this.optTitle = "结束任务";
  			this.optDescribe = "任务分享页面将不再显示，返回剩余任务金额";
  		}else{
  			this.optTitle = "继续任务";
  			this.optDescribe = "任务分享页面将展示，恢复任务浏览量消耗";
  		}
  		this.status = type;
  		this.showStatusSheet = false;
  		this.optFlag = true;
  	},
  	getTask:function(id){
  		getTaskDetail(id)
  		.then((res)=>{
  			this.task = res.data
  		},(err)=>{
  			
  		})
  	},
  	operaStatus:function(){
  		this.showStatusSheet = true;
  	},
  	cancelSheets:function(){
  		this.showStatusSheet = false;
  	}
  }
}
</script>

