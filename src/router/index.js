import Vue from 'vue'
import Router from 'vue-router';
//css样式
import "../../static/css/base.css";
import "../../static/css/checkout.css";
import "../../static/css/nav-header.css";
import "../../static/css/nav-bread.css";
import "../../static/css/nav-footer.css";
import "../../static/css/goods-list.css";


//路由配置
const Hello=resolve=>require(['@/components/HelloWorld'],resolve);
const goodsList=resolve=>require(["@/components/goods/goodsList"],resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Hello
    },
    {
      path:"/goods",
      component:goodsList
    }
  ]
})
