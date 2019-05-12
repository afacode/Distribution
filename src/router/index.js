import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
//vue-router懒加载
const Index = () => import(/* webpackChunkName: "mint-index" */ '@/views/index')

const Account = () => import(/* webpackChunkName: "mint-index" */ '@/views/account')
const Recharge = () => import(/* webpackChunkName: "mint-index" */ '@/views/recharge')
const Pay = () => import(/* webpackChunkName: "mint-index" */ '@/views/pay')
const Trading_flow = () => import(/* webpackChunkName: "mint-index" */ '@/views/trading_flow')
const Withdraw_deposit = () => import(/* webpackChunkName: "mint-index" */ '@/views/withdraw_deposit')
const task = ()=> import('@/views/create_task')
const task_undertaking = () => import(/* webpackChunkName: "mint-task" */ '@/views/task_undertaking')
const task_spread = () => import(/* webpackChunkName: "mint-task" */ '@/views/task_spread')
const spread_list = () => import(/* webpackChunkName: "mint-spread" */ '@/views/spread_list')
const task_list = () => import(/* webpackChunkName: "mint-task" */ '@/views/task_list')
const publish = ()=> import('@/views/task_publish')
const tasklist = ()=>import('@/views/task_list')
const taskdetail = ()=>import("@/views/task_details")
const supplement = ()=>import("@/views/supplemental")
const demo = ()=>import("@/views/demo")

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Account',
      component: Account,
      meta: {title: '账户'}
    },
  
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {title: '账户'}
    },
    {
      path: '/recharge',
      name: 'Recharge',
      component: Recharge,
      meta: {title: '充值'}
    },
    {
      path: '/pay/:cash',
      name: 'Pay',
      component: Pay,
      meta: {title: '确认支付'}
    },
    {
      path: '/withdraw_deposit',
      name: 'Withdraw_deposit',
      component: Withdraw_deposit,
      meta: {title: '提现'}
    },
    {
      path: '/trading_flow',
      name: 'Trading_flow',
      component: Trading_flow,
      meta: {title: '明细|交易流水'}
    },
   	{
   		path:'/task',
   		name:'task',
   		component:task,
   		meta:{title:'分享系统创建任务'}
     },
     {
      path:'/task_undertaking',
      name:'task_undertaking',
      component:task_undertaking,
      meta:{title:'分享系统任务承接'}
      
    },
    {
      path:'/task_spread',
      name:'task_spread',
      component:task_spread,
      meta:{title:'分享系统任务传播'}
      
    },
    {
      path:'/task_list',
      name:'task_list',
      component:task_list,
      meta:{title:'分享系统任务列表'}
      

   	},
   	{
   		path:'/publish/:id',
   		name:'publish',
   		component:publish,
   		meta:{title:"任务发布"}
   	},
   	{
   		path:'/tasklist',
   		name:'tasklist',
   		component:tasklist,
   		meta:{title:'已发布任务'}
   	},
   	{
   		path:'/taskdetail/:id',
   		name:'taskdetail',
   		component:taskdetail,
   		meta:{title:'已发布任务'}
   	},
   	{
   		path:'/supplement/:id',
   		name:'supplement',
   		component:supplement,
   		meta:{title:'补充浏览量'}
     },
     {
      path:'/spread_list',
      name:'spread_list',
      component:spread_list,
      meta:{title:'传播者佣金列表'}
    },
    {
      path:'/demo',
      name:'demo',
      component:demo,
      meta:{title:'接口demo'}
    }


    
  ]
})
