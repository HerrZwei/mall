<template>
  <div class="tab-control">
    <div
    @click="itemClick(index)"
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: currentIndex === index }"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  line-height: 40px;
  background-color: #fff;
  z-index: 9;
}

.tab-control-item { 
  flex: 1;
  height: 40px;
  line-height: 40px;
}

.active {
  color: var(--color-high-text);
}

.active > span {
  border-bottom: 2px solid var(--color-high-text);
}

.tab-control-item span {
  padding: 3px;
}
</style>
