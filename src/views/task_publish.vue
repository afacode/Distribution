<template>
  <div class="publish-c">
  	<div class="weui-cells__title">右上角菜单分享</div>
  	<div class="weui-cells weui-cells_form publish-title">
    		<div class="weui-cells__title set-title">点击右上角“...”分享</div>
    </div>
    <div class="weui-cells__title">链接分享</div>
    <div class="weui-cells weui-cells_form">
        <div class="weui-cell ">
            <div class="weui-cell__bd">
                <input class="weui-input weui-btn_disabled share-link" readonly="readonly" type="text" id="shareLink"  v-model="shareLink"/>
            </div>
            <label class="weui-label copy-c">
            	<a href="javascript:;"  data-clipboard-target="#shareLink" class="weui-btn weui-btn_mini weui-btn_primary copy-btn">复制链接</a>
            </label>
        </div>
    </div>
    <div class="weui-cells__title">二维码分享</div>
   <div class="qrcode">
        <qrcode :value="shareLink"  :options="{ size: 200 }" ></qrcode>
    </div>
    <router-link to="/tasklist" tag="div" class="weui-cells__title ">
    	<div class="page-create-btn-c ">
        		<span   class="weui-btn weui-btn_primary" >进入任务列表</span>
   		</div>
    </router-link>
     <!--BEGIN toast-->
    <div id="toast" v-show="copySuccess">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-icon-success-no-circle weui-icon_toast"></i>
            <p class="weui-toast__content">链接复制成功</p>
        </div>
    </div>
    <!--end toast-->

  </div>
</template>
<style scoped="scoped">
.white-icon {
  color: #fff;
  background: transparent;
}
.publish-title div {
  color: #000;
}
.publish-title:before {
  border: none;
}
.publish-title:after {
  border: none;
}
.set-title {
  margin-bottom: 0.77em;
}
.share-link {
  color: #ababab;
  border: 1px solid #dbdbdb;
  background: #ebebeb;
}
.copy-btn {
  float: right;
  border: 1px solid #1aad19;
  color: #1aad19;
  background: #fff;
}
.weui-cells:before {
  border: none;
}
.weui-cells:after {
  border: none;
}
#toast .weui-toast {
  width: 9.6em;
}
.publish-c .qrcode {
  width: 2rem;
  margin: 0.2rem auto 0.4rem auto;
}
</style>
<script>
import VueQrcode from "@xkeshi/vue-qrcode";
import wx from "weixin-js-sdk";
import Clipboard from "clipboard";
export default {
  components: { qrcode: VueQrcode },
  data() {
    return {
      shareLink: "",
      copySuccess: false,
      taskId: ""
    };
  },
  created() {},
  mounted() {
    this.taskId = this.getURL(this);
    this.shareLink =
      "https://" +
      document.domain +
      "/#/task_undertaking?promotionId=" +
      this.taskId;
    var _self = this;
    const clipboard = new Clipboard(".copy-btn");
    clipboard.on("success", function(e) {
      _self.copySuccess = true;
      setTimeout(function() {
        _self.copySuccess = false;
      }, 2000);
      e.clearSelection();
    });
	var _self=this;
    clipboard.on("error", function(e) {});

    this.shareWx.getId();
    this.shareWx.enableShare();
    this.shareWx.shareReady("分享拿佣金", "转发分享拿佣金", "", this.shareLink); //title,desc,imgUrl,link
  },
  methods: {
    getURL: _vue => _vue.$route.params.id
  }
};
</script>

