<template>
  <div :class="collapse ? 'app-sidebarActive app-sidebar' : 'app-sidebar'">
    <el-aside class="hbb-el-aside" width="auto" style="margin-top:70px">
      <el-menu
        :default-openeds="currentMenuArr"
        class="el-menu-vertical-demo"
        :collapse-transition="true"
        :collapse="collapse"
        :unique-opened="false"
      >
        <template v-for="(item, index) in navSideConfigList">
          <el-submenu
            v-if="item.show"
            :key="index"
            :index="String(index)"
            :class="{
              active: $route.path === item.href || item.active,
              noChild: item.children.length === 0
            }"
            popper-class="hbb-left-menu-popper"
          >
            <template slot="title" v-if="item.children.length > 0">
              <i class="menu-icon iconfont" :class="'icon-' + item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <template slot="title" v-else>
              <div style="width: 100%;" @click.stop="onMenuClick(item)">
                <i class="menu-icon iconfont" :class="'icon-' + item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </div>
            </template>

            <el-menu-item-group v-if="item.children.length > 0 && item.id">
              <template v-for="(ite, ind) in item.children">
                <el-menu-item
                  v-if="ite.show"
                  :key="ind"
                  :class="{ active: $route.meta.title === ite.name }"
                  @click="onMenuGroup(ite, ind, index)"
                >
                  <span slot="title" style="padding-left: 20px">
                    {{ ite.name }}</span
                  >
                </el-menu-item>
              </template>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from "vue-property-decorator";
import { Route } from "vue-router";
import mapsRouterData from "@/router/maps";
import { LoginModule } from "@/store/modules/user/login";

type NavConfigType = {
  name: string; // menu名
  id: string; // id
  active: boolean;
  href?: string;
  icon?: string;
  show?: boolean;
  children?: Array<NavConfigType>;
};
@Component({})
export default class Sidebar extends Vue {
  @Prop({ type: Boolean, default: false, required: false })
  collapse!: boolean;

  navSideConfigList: Array<any> = []; // 路由的数据
  currentMenuArr = ["0"]; // 当前展开的菜单栏选项 默认为首页

  get permission() {
    // 获取菜单栏的权限
    return (LoginModule as any).store.state.Login.permissionList;
  }

  @Watch("collapse")
  onCollapseChange() {
    // 通过折叠的情况去控制哪一个菜单栏
    window.setTimeout(() => {
      this.setRouterData();
    }, 550);
  }

  @Watch("$route")
  onRouterChange(route: Route) {
    // 通过路由改变的的情况去控制哪一个菜单栏
    this.setRouterData();
  }

  setRouterData() {
    // 路由改变之后 重新设置展开的菜单选项
    this.currentMenuArr = [];
    this.currentMenuArr.push(this.$route.meta.groupMid);
    // 重置激活状态下的菜单栏
    this.navSideConfigList.forEach((x: any) => {
      x.active = false;
    });
    const routerArr = this.navSideConfigList.filter(
      (x: any) => x.id === this.$route.meta.groupId
    );
    if (routerArr[0]) {
      routerArr[0].active = true;
    }
  }

  mounted() {
    // 初始化 dome渲染完毕
    this.init();
    this.setRouterData();
  }

  init() {
    // 页面初始化
    const list: Array<NavConfigType> = [];
    mapsRouterData.forEach(x => {
      for (const it in x.children) {
        // 遍历二级模块
        if (!x.children.hasOwnProperty(it)) {
          continue;
        }
        const secModule = x.children[it];
        if (Array.isArray(x.children) && x.children.length > 0) {
          let id = "";
          let name = "";
          let href = "";
          let active = false;
          const childrenData = [];
          if (secModule.children.length > 1) {
            // 有多个三级项目
            name = secModule.name; // 名
            id = String(secModule.id); // id
            let isActive = false; // 是否有子项有选中
            for (let i = 0; i < secModule.children.length; ++i) {
              // 遍历三级
              const child_i: any = secModule.children[i];
              let child_active = false;
              if (child_i && this.$route.path === child_i.href) {
                // active = true;
                child_active = true;
                isActive = true;
              }
              // 还要保证三级有权限
              // if (!this.permissionList.includes(String(child_i.id))) {
              //     continue;
              // }
              // 填充3级
              childrenData.push({
                id: String(child_i.id),
                name: child_i.name,
                href: child_i.href,
                active: child_active // 子项选中，父级项也选中
              });
            }

            // 如果没有active，则需要判断是不是关联的页面
            if (!isActive) {
              for (let i = 0; i < childrenData.length; ++i) {
                if (childrenData[i]?.href === this.$route.path) {
                  active = true;
                  childrenData[i].active = true;
                  break;
                }
              }
            }
          } else {
            // 只有一个
            if (this.$route.path === secModule.children[0].href) {
              // 直接相通
              active = true;
            } else if (
              this.getParentPath(secModule.children[0].href) ===
              this.getParentPath(this.$route.path)
            ) {
              active = true;
            }

            name = secModule.name; // 姓名
            href = String(secModule.children[0].href); // 链接
            id = String(secModule.id); // id
          }
          list.push({
            name: secModule.name,
            id: String(secModule.id),
            icon: secModule.icon || "",
            href: secModule.href || "",
            active, // 子项选中，父级项也选中
            show: true, // 菜单栏是否展示 【根据权限去控制】
            children: childrenData
          });
        }
      }
    });
    list.forEach((x: any) => {
      x.show = this.permission.includes(x.id);
      x.children.forEach((y: any) => {
        y.show = this.permission.includes(y.id);
      });
    });
    // 最终展示的菜单栏
    this.navSideConfigList = list;
  }

  getParentPath(url: string, level = 1) {
    // 处理父级的地址
    return url.replace(/\/*$/, "").substring(0, url.lastIndexOf("/"));
  }

  onMenuClick(data: any, index: number) {
    // 点击一级菜单
    if (!data.children.length) {
      this.$router.push({
        path: data.href
      });
    } else {
      return false;
    }
  }

  onMenuGroup(ite: any, index: number, pIndex: number) {
    // 点击二级菜单

    this.$router.push({
      path: ite.href
    });
  }
}
</script>

<style lang="scss"></style>
