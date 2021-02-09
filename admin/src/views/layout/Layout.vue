<!--带顶部栏，侧边栏的布局-->
<template>
  <div class="app-wrapper">
    <headbar @setShrinkData="setShrinkData" />
    <sidebar :collapse="collapse" class="sidebar-container" ref="sidebarView" />
    <app-main :collapse="collapse" :key="new Date().getTime()" ref="mainView" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Headbar, Sidebar, AppMain } from "./components/index";

@Component({
  components: { Headbar, Sidebar, AppMain }
})
export default class Layout extends Vue {
  collapse = false; // 菜单收缩

  setShrinkData() {
    // 设置菜单栏权限
    this.collapse = !this.collapse;
  }
}
</script>

<style lang="scss" scoped></style>
