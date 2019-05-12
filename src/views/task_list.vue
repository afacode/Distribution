 <template>
 <div class="task-lists-c">
    <div class="weui-panel weui-panel_access">
            <div class="weui-panel__bd">
            	<router-link v-for="(item,index) in items" :to="/taskdetail/+item.id" tag="a" class="weui-media-box weui-media-box_appmsg" :key="index">
            		<!--<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" v-for="item in items">-->
	                    <div class="weui-media-box__bd task-des">
	                        <h4 class="weui-media-box__title">{{item.name}}</h4>
	                        <p class="weui-media-box__desc">任务总奖金¥{{item.price}}</p>
	                        <p class="weui-media-box__desc">任务目标浏览量{{item.viewLimit}}</p>
	                        <p class="weui-media-box__desc">{{item.undertakeAmount}}人已承接</p>
	                    </div>
	                    <div class="weui-media-box__hd flex-box">
	                    		<h4 class="weui-media-box__title " v-bind:class="{'status-title-stop':item.status=='2','status-title-in':item.status=='1','status-title-end':item.status=='0'}">{{statusArr[item.status]}}</h4>
	                    		<div class="percent-c">
	                    			{{item.viwes/item.viewLimit*100 | parseInt}}%
	                    		</div>
	                    		 <p class="weui-media-box__desc scan-num">已有{{item.viwes}}次浏览量</p>
	                    </div>
	                <!--</a>-->
            	</router-link>
            </div>
        </div>
  </div>
</template>
<style scoped="scoped">
	.task-lists-c .weui-cells{
		margin-top:0;
	}
	.task-des p{
		line-height: 1.5;
	}
	.task-lists-c .weui-media-box__hd{
		width:40%;
		margin-right: 0;
		height:100%;
		text-align: right;
		line-height: 1.6;
	}
	.task-lists-c .weui-media-box__hd:after{
		content: "";
	  display: block;
	  height: 0;
	  visibility: hidden;
	  clear: both;
	}
	.percent-c{
		width:32px;
		height:32px;
		border-radius: 50%;
		border:1px solid #26aa28;
		text-align: center;
		color: #ababab;
		font-size:14px ;
		line-height:32px;
		display: inline-block;
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
	.flex-box{
		position: relative;
	}
	.flex-box div,.flex-box h4{
		flex-direction: row;
	}
	.flex-box p{
		padding-top:.2em;
		text-align: right;
		line-height:1.6;
	}
</style>
<script>
	import {getTaskList} from '@/api/task'
export default {
  data(){
  	return{
  		items:[],
  		statusArr:["已结束","进行中","暂停中"],
  		wechat_id:""
  	}
  },
  created(){
		this.shareWx.disableShare();
	     this.wechat_id=this.getCookie("boba_wechat_id");
	    if(!this.wechat_id){
	       window.location.href = "/admin/boba/wechat/login?originUrl="+encodeURIComponent('https://'+window.location.host+'/#'+this.$route.fullPath);
	    }
	    this.wechat_id=this.getCookie("boba_wechat_id");
	    this.getList(this.wechat_id)
		.then(json=>{
			this.items = json;
		})
	},
  mounted(){
	
  },
  methods:{
  	getList:(id)=>{
  		return new Promise(function(resolve,reject){
  			getTaskList(id)
	  		.then((res)=>{
	  			resolve(res.data)
	  		},(err)=>{
	  			reject(err)
	  		})
  		})
  		
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
    }
  }
}
</script>