<template>
  <div class="nav-common-breadcrumb" :class="{ hide: isHide }">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="cap">
        当前位置
      </el-breadcrumb-item>
      <template v-for="(item, idx) in routeData">
        <el-breadcrumb-item
          v-if="item.path"
          :key="idx"
          :to="{ path: item.path }"
        >
          {{ item.title }}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="!item.path" :key="idx">
          {{ item.title }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import mapsRouterData from "@/router/maps";

@Component
export default class MyBreadcrumb extends Vue {
  routeData = [];
  isHide = false;
  curMenuId = "01"; // 当前选择的菜单栏id

  mounted() {
    this.setRouteData();
  }

  // 路由发生了变化，重新渲染路由
  @Watch("$route")
  onRouterChange(route: Route) {
    this.setRouteData();
  }

  setRouteData() {
    this.isHide = false;
    // 获取对应模块
    this.curMenuId = this.$route.meta.groupId;
    const matchModule = mapsRouterData.find((item: any) => {
      return String(item.id) === String(this.curMenuId);
    });
    if (!matchModule) {
      console.error("找不到对应模块，模块id:", this.curMenuId);
      return false;
    }
    // /* 一级 */
    const list: any = [];
    list.push({
      title: matchModule.name,
      path: matchModule.defaultLink
    });
    for (let i = 0; i < matchModule.children.length; ++i) {
      const secChild = matchModule.children[i];
      if (!secChild?.children?.[0]) {
        continue;
      }
      for (let j = 0; j < secChild.children.length; ++j) {
        const thrChild: any = secChild.children[j];
        if (!thrChild) {
          continue;
        }
        if (this.$route.path === thrChild.href) {
          // 直接相同
          list.push({
            title: thrChild.name,
            path: thrChild.href
          });
        } else if (
          this.getParentPath(this.$route.path) ===
          this.getParentPath(thrChild.href)
        ) {
          // do thing
        }
      }
    }
    this.routeData = list;
  }

  getParentPath(url: string) {
    return url.replace(/\/*$/, "").substring(0, url.lastIndexOf("/"));
  }
}
</script>

<style lang="scss" scoped></style>
