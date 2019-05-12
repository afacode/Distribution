<template>
  <div>
      <ul>
          <li v-for="item in city" v-html="item.descript"></li>
      </ul>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import { getDesinerList } from '@/api/demo';
export default {
    data(){
        return {
            city:[]
        }
    },
    created(){
        this.shareWx.forbidden();
        this.getList();
    },
    mounted(){

    },
    methods:{
        getList(){
            var _self=this;
            getDesinerList({page_no:1,page_size:20})
            .then(res=>{
                if(res.data.code!=200){
                    return MessageBox('连接错误');
                }
                _self.city=res.data.data.result;
                debugger
                console.log(res,'success')

            })
            .catch(error=>{
                     console.log(error,'error')
            })
           
        }
    }
}
</script>

