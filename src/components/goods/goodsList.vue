<template>
  <div>
    <nav-header></nav-header>
    <nav-bread></nav-bread>
    <div class="accessory-result-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">排序:</span>
          <a href="javascript:void(0)" class="default cur">默认</a>
          <a href="javascript:void(0)" class="price">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
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
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
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
                  goodsList:[],
                  priceList:[
                      {'startPrice':"0.00",'endPrice':"1000.00"},
                      {'startPrice':"1000.00",'endPrice':"2000.00"},
                      {'startPrice':"2000.00",'endPrice':"3000.00"},
                      {'startPrice':"3000.00",'endPrice':"4000.00"},
                      {'startPrice':"4000.00",'endPrice':"5000.00"},
                  ],
                  priceChecked:'all',
                  filterShow:false,
            }
        },
        methods:{
            getGoodsList(){
                axios.get("http://localhost:3000/goods").then(result=>{
                  console.log(result)
                  this.goodsList=result.data.list;
                  console.log(this.goodsList)
                })
            },
            //价格区间选中事件
            checkedPrice(index){
                this.priceChecked=index;
            },
            //开启移动端筛选
            showFilterPop(){
                this.filterShow=true;
            },
            //关闭移动端筛选
            closeFilterPop(){
              this.filterShow=false;
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
