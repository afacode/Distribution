// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/common/css/normalize.css'
import '@/common/css/weui.css'
import store from './store'
import shareWx from '@/common/js/shareWx'
import getAuthor from '@/common/js/getAuthor'
import VueWechatTitle from 'vue-wechat-title'; 
import "mint-ui/lib/style.css";

Vue.config.productionTip = false
Vue.prototype.shareWx=shareWx;
Vue.prototype.getAuthor=getAuthor;

 
Vue.use(VueWechatTitle)
Vue.filter('parseInt',function(value){
  	return Math.floor(value);
 });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})