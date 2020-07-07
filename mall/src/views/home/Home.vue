<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <p slot="center">购物街</p>
    </nav-bar>
    <tab-control v-show="isTabFixed" class="top-tab-control" @tabClick="tabClick" :titles="['流行', '新款', '经典']" ref="TabControl2"></tab-control>
    <scroll
      @pullingUp="loadMore"
      :pull-up-load="true"
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <home-swiper @swiperImgLoad="swiperImgLoad" :banners="banners" />
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature></home-feature>
      <tab-control @tabClick="tabClick" :titles="['流行', '新款', '经典']" ref="TabControl1"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isshowBack"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childrenComps/HomeSwiper";
import HomeRecommend from "./childrenComps/HomeRecommed";
import HomeFeature from "./childrenComps/HomeFeature";

import NavBar from "components/common/navbar/navBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsLIst";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debonce } from 'common/utils'
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isshowBack: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听图片加载完成
    const refresh = debonce(this.$refs.scroll.refresh, 50); // 防抖动
    this.$bus.$on("itemImgLoad", () => {
      refresh();
    });
  },
  deactivated() {
    // console.log('我离开了')
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.$refs.scroll.getScroll())
  },
  activated() {
    // console.log('我进入了')
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 获取不同类型下的数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
    // 事件监听的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // console.log(this.$refs)
      this.$refs.TabControl1.currentIndex = index
      this.$refs.TabControl2.currentIndex = index
    },

    //
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 2000);
    },
    contentScroll(position) {
      // console.log(position.y)
      // if (position.y < -1000) {
      //   this.isshowBack = true;
      // } else {
      //   this.isshowBack = false;
      // }
      // console.log(position.y < -this.tabOffsetTop)
      this.isshowBack = position.y < -1000
      this.isTabFixed = position.y < -this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImgLoad() {
      // console.log(this.$refs.TabControl1.$el.offsetTop)
      this.tabOffsetTop = this.$refs.TabControl1.$el.offsetTop
    }
  }
};
</script>

<style scoped>
#home {
  padding-bottom: 44px;
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  /* position: fixed;
  left: 0;
  right: 0;
  z-index: 9; */
}

.content {
  /* height: calc(100% - 93px); */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.top-tab-control {
  position: relative;
  z-index: 9;
}
</style>
