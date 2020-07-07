<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, i) in banners" :key="i">
        <a :href="item.link">
          <img :src="item.image" alt='' @load="swiperImgLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: "HomeSwiper",
  data() {
    return {
      isload: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    swiperImgLoad() {
      if (!this.isload) {
        this.$emit('swiperImgLoad')
        this.isload = true
      }
    }
  },
};
</script>

<style scoped>
</style>
