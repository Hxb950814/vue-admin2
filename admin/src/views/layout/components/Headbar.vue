<template>
  <header class="app-header clearfix">
    <div :class="isShrink ? 'l-part l-partActive' : 'l-part'">
      <a class="image-icon" href="/">
        <img src="@assets/images/head_icon.jpg" width="30" alt="logo" />
        <span v-show="!isShrink">CRM管理系统</span>
      </a>
    </div>
    <div :class="isShrink ? 'shou-menu active' : 'shou-menu'" @click="shrink">
      <span class="iconfont icon-shouqi"></span>
    </div>
    <ul class="right-menu">
      <li class="item" @click="safeExit">管理员：{{ userName }}</li>
    </ul>
  </header>
</template>

<script lang="ts">
import { Component, Provide, Watch, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
import { LoginModule } from "@/store/modules/user/login";

@Component
export default class Headbar extends Vue {
  userName = ""; // 用户名
  isShrink = false; // 菜单栏当时的状态

  mounted() {
    this.userName = LoginModule.getUserInfo.username;
  }

  // 路由发生了变化，重新渲染路由
  @Watch("$route")
  onRouterChange(route: Route) {}

  shrink() {
    // 点击设置菜单栏的状态
    this.isShrink = !this.isShrink;
    this.$emit("setShrinkData");
  }

  /* 登出 */
  safeExit() {
    window.location.href = "/login";
    localStorage.removeItem("vuexData");
    localStorage.setItem("DEALER_ID", LoginModule.getUserInfo.dealerId);
  }
}
</script>

<style lang="scss" scoped></style>
