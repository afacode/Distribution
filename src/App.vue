<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view> 
  </div>
</template>

<script>
import "mint-ui/lib/style.css";
export default {
  data() {
    return {};
  },
  created() {
  
  },

  methods: {

  }
};
</script>

<style>
html {
  font-size: 100px;
  height: 100%;
  font-family: "Helvetica Neue',Helvetica,Arial,sans-serif"
}
body {
  font-size: .14rem;
  height: 100%;
  background:#f8f8f8;
}
.container {
  height: 100%;
}
.more {
  color: #999;
  font-size: 0.11rem;
  line-height: 14px;
  margin-bottom: 0.09rem;
}
#app{
     height:100%;
}
</style>
