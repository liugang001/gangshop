import Vue from 'vue'
import Router from 'vue-router';
//css样式
import "../../static/css/base.css";
import "../../static/css/goods-list.css";


//路由配置
const goodsList=resolve=>require(["@/components/goods/goodsList"],resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/home"
    },
    {
      path:"/home",
      component:goodsList
    }
  ]
})
