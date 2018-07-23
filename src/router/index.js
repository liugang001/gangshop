import Vue from 'vue'
import Router from 'vue-router';
import VueLazyload from 'vue-lazyload'//懒加载
import VueInfiniteScroll from "vue-infinite-scroll";
//css样式
import "../../static/css/base.css";
import "../../static/css/goods-list.css";


//路由配置
const goodsList=resolve=>require(["@/components/goods/goodsList"],resolve);
const cartList=resolve=>require(["@/components/cart/cartList"],resolve);

Vue.use(Router);
Vue.use(VueInfiniteScroll);
Vue.use(VueLazyload,{
  preLoad:1.4,
  loading: 'static/loading-svg/loading-bars.svg',
  attempt: 5
})

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/home"
    },
    {
      path:"/home",
      component:goodsList
    },
    {
      path:"/cart",
      component:cartList
    }
  ]
})
