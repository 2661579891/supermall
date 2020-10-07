<template>
  <div id="home">
<!--    最上边栏-->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
<!--    轮播图-->
    <home-swiper :banners="banners"/>
<!--    推荐-->
    <recommend-view :recommends="recommends"/>
<!--    -->
    <feature-view/>
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
    <ul>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
    </ul>
  </div>
</template>

<script>
//导入的子组件
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
//导入的公共组件
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "./childComps/GoodsList";

  import {
    getHomeMultidata,
    getHomeGoods
  } from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList
    },
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'news': {page: 0,list: []},
          'sell': { page: 0,list: []}
        },
        currentType: 'pop'
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    created() {
      //1、请求多个数据
      this.getHomeMultidata();
      //2、请求商品信息
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    methods: {
      /**
       * 事件监听相关代码
       */
      tabClick(index) {
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
      },

      /**
       * 网络请求相关代码
       */
      getHomeMultidata(){
        getHomeMultidata().then(
          result => {
            console.log(result);
            this.banners = result.data.data.banner.list;
            console.log(this.banners);
            this.recommends = result.data.data.recommend.list;
          }
        );
      },
      getHomeGoods(type){
        getHomeGoods(type, this.goods[type].page+1).then(result => {
          this.goods[type].list.push(...result.data.list);
          this.goods[type].page += 1;
        });
      },

    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99;
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>
