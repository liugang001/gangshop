<template>
  <div>
    <nav-header></nav-header>
    <nav-bread></nav-bread>
    <div class="accessory-result-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">排序:</span>
          <a href="javascript:void(0)" class="default cur" @click="defaultSort()">默认</a>
          <a href="javascript:void(0)" class="price" :class="{'sort-up':service.sortFlag}" @click="sortGoods()">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby" @click="showFilterPop()">筛选</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter" id="filter" :class="{'filterby-show':filterShow}">
            <dl class="filter-price">
              <dt>价格区间:</dt>
              <dd><a href="javascript:void(0)" @click="checkedPrice('all')" :class="{'cur':priceChecked=='all'}">选择价格</a></dd>
              <dd v-for="(item,index) in priceList">
                <a href="javascript:void(0)" @click="checkedPrice(index)" :class="{'cur':priceChecked==index}">￥ {{item.startPrice}} - {{item.endPrice}} 元</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList" :id="item.productId">
                  <div class="pic">
                    <transition name="fade">
                        <a href="#"><img v-lazy="'static/img/'+item.productImage" alt=""></a>
                    </transition>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="view-more-normal"
                 v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="busy"
                 infinite-scroll-distance="20">
                <img src="./../../../static/loading-svg/loading-spinning-bubbles.svg" v-show="loading">
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
    <transition name="fade">
        <div class="md-overlay" v-show="filterShow" @click.stop="closeFilterPop()"></div>
    </transition>

  </div>
</template>

<script>
    import qs from 'querystring';
    import axios from 'axios';
    import NavHeader from "@/components/common/NavHeader";
    import NavFooter from "@/components/common/NavFooter";
    import NavBread from "@/components/common/NavBread";
    export default {
        name: "goodsList",
        components:{
          NavHeader,NavFooter,NavBread
        },
        data(){
            return {
                  service:{
                      page:1,
                      pageSize:8,
                      sortFlag:true,
                  },
                  busy:true,
                  loading:false,
                  goodsList:[],
                  priceList:[
                      {'startPrice':"0.00",'endPrice':"500.00"},
                      {'startPrice':"500.00",'endPrice':"1000.00"},
                      {'startPrice':"2000.00",'endPrice':"3000.00"},
                      {'startPrice':"3000.00",'endPrice':"4000.00"},
                      {'startPrice':"4000.00",'endPrice':"5000.00"},
                  ],
                  priceChecked:'all',
                  filterShow:false,
            }
        },
        methods:{
            getGoodsList(flag){
                this.loading=true;
                var service=this.service;
                var data={
                    page:service.page,
                    pageSize:service.pageSize,
                    sortFlag:service.sortFlag?1:-1,
                    priceLevel:this.priceChecked
                }
                axios.post("http://localhost:3000/goods",qs.stringify(data)).then(result=>{
                  var res=result.data;
                  this.loading=false;
                  if(res.status==2000){
                      if(flag&&res.list!==0){
                           this.goodsList=this.goodsList.concat(res.list);
                           this.busy=res.len==0?true:false;
                      }else{
                          this.goodsList = res.list;
                          this.busy = false;
                      }
                  }else{
                    console.log("发生错误")
                    this.goodsList=[];
                  }
                }).catch(()=>{
                  console.log('无法连接到服务器');
                })
            },
            //商品的默认排序
            defaultSort(){
              this.service.sortFlag=true;
              this.service.page=1;
              this.getGoodsList();
            },
            //商品的升序与降序排列
            sortGoods(){
              this.service.sortFlag =!this.service.sortFlag;
              this.service.page = 1;
              this.getGoodsList();
            },
            //价格区间选中事件
            checkedPrice(index){
                this.service.page=1;//重置第一页
                this.priceChecked=index;
                this.getGoodsList();
            },
            //开启加入到购物车
            addCart:function(id){
              var data={productId:id}
              axios.post("http://localhost:3000/goods/addCart",qs.stringify(data)).then(function(result){
                  var res=result.data;
                  if(res.status==0){
                      alert("添加成功");
                  }else{
                      alert("添加失败");
                  }
              }).catch(function(){
                console.log("无法连接到无服务器");
              })
            },
            //开启移动端筛选
            showFilterPop(){
                this.filterShow=true;
            },
            //关闭移动端筛选
            closeFilterPop(){
              this.filterShow=false;
            },
            //加载更多数据
            loadMore(){
                this.busy=true;
                setTimeout(()=>{
                    this.service.page++;
                    this.getGoodsList(true);
                },50)
            }
        },
        mounted(){
          this.getGoodsList();
        }
    }
</script>
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
