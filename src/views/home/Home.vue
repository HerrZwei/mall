<template>
  <nav-bar class="home-nav">
    <p slot="center">购物街</p>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/navBar";
export default {
  name: "Home",
  components: {
    NavBar
  }
};
</script>

<style>
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
}
</style>
