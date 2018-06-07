import Vue from 'vue'
import Router from 'vue-router'
//页面级组件
import login from '@/page/login'
import addshop from '@/page/addshop/addshop'
import goodslist from '@/page/goodsList'
import addgoods from '@/page/addGoods'
import mainrouter from '@/page/mainrouter/mainrouter'
import echarts from '@/page/echart'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',// 默认进入路由
    redirect: '/home',//重定向
    meta: []
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/home',
    name: 'home',
    component: mainrouter,
    meta: []
  }, {
    path: '/echarts',
    name: 'echarts',
    component: echarts,
    meta: ['数据列表', '商家列表']
  }, {
    path: '/addshop',
    name: 'addshop',
    component: addshop,
    meta: ['添加数据', '添加商铺']
  }, {
    path: '/goodslist',
    name: 'goodslist',
    component: goodslist,
    meta: ['数据管理', '食品列表']
  }, {
    path: '/addgoods',
    name: 'addgoods',
    component: addgoods,
    meta: ['添加数据', '添加食品']

  }]
})


router.beforeEach((to, from, next) => {

  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  const nextRoute = ['home', 'addshop', 'goodslist', 'addgoods'];
  let isLogin = global.isLogin;

  if (sessionStorage.isLogin == undefined) {
    isLogin = false;
  } else {
    isLogin = JSON.parse(sessionStorage.isLogin);
  }

  // 是否登录
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (nextRoute.indexOf(to.name) >= 0) {
    if (!isLogin) {
      window.location.reload()
      router.push({
        name: 'login'
      })

    }
  }
  // 已登录状态；当路由到login时，跳转至home 
  if (to.name === 'login') {
    if (isLogin) {
      router.push({
        path: '/'
      });
      window.location.reload()


    }
  }
  next();
});

export default router;