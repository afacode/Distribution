<template>
<div class="page-taskSpread">
    <div class="weui-cells__title">微信分享</div>
    <div class="weui-cells  ">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>点击右上角“..”分享</p>
            </div>
        </div>
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
  
    <div class="page__bd page__bd_spacing footer">
        <div class="cont">
            <router-link :to="'spread_list?userid='+authorId"  class="weui-btn weui-btn_primary">任务列表</router-link>
        </div>
    </div>
</div>

</template>
<style>
.page-taskSpread {
  position: relative;
}
.page-taskSpread .page__bd .cont {
  margin: 20px 0;
  padding: 0 15px;
}
.page-taskSpread .footer {
  width: 100%;
  position: fixed;
  bottom: 0.2rem;
}
.page-taskSpread .qrcode {
  width: 2rem;
  margin: 0.2rem auto 0 auto;
}
.page-taskSpread	.share-link{
		color:#ababab;
		border: 1px solid #dbdbdb;
		background:#ebebeb;
	}
.page-taskSpread	.copy-btn{
		float: right;
		border: 1px solid #1aad19;
		color:#1aad19;
		background:#fff;
	}
</style>
<script>
import { MessageBox, Toast } from "mint-ui";
import wx from "weixin-js-sdk";
import VueQrcode from "@xkeshi/vue-qrcode";
import { spreadUrl } from "@/api/task_spread";
import Clipboard from "clipboard";

export default {
  components: { qrcode: VueQrcode },
  data() {
    return {
      authorId: "",
      shareLink: ""
    };
  },
  created() {
    this.wxAuthor();
    this.getSpreadUrl();
  },
  mounted(){
      this.copyLink();
  },
  methods: {
    wxAuthor() {
      this.authorId = this.getAuthor.getCookie("boba_wechat_id");
      if (!this.authorId) {
        this.getAuthor.goAuthor();
      }
    },
    getSpreadUrl() {
      var _self = this;
      spreadUrl({
        promotionId: this.$route.query.promotionId,
        spreaderId: this.authorId
      })
        .then(res => {
          if (!res.data) {
            return MessageBox("获取链接失败");
          }
          _self.shareLink = res.data;
          this.shareWx.getId();
          this.shareWx.enableShare();
          this.shareWx.shareReady("分享拿佣金", "转发分享拿佣金", "", _self.shareLink); //title,desc,imgUrl,link
        })
        .catch(error => {
          Toast(error.message);
        });
    },
    copyLink() {
      const clipboard = new Clipboard(".copy-btn");
      clipboard.on("success", function(e) {
        Toast("复制成功");

        e.clearSelection();
      });

      clipboard.on("error", function(e) {
        Toast("复制失败");
      });
    }
  }
};
</script>

