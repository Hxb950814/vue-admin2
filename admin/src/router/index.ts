import Vue from "vue";
import Router, { Route } from "vue-router";
// 引入加载条的优化
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 项目的页面模块
import homeManageModule from "./modules/homeManageModule"; // 首页
import userManageModule from "./modules/userManageModule"; // 客户管理
import systemManageModule from "./modules/systemManageModule"; // 系统设置
import dataManageModule from "./modules/dataManageModule"; // 数据报表
if (!(window as any).VueRouter) {
  Vue.use(Router);
}
// 进度条配置项
NProgress.configure({
  showSpinner: false
});
const constantRouterMap = [
  ...homeManageModule,
  ...userManageModule,
  ...systemManageModule,
  ...dataManageModule,
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue")
  },
  {
    path: "*",
    component: () => import("../views/404.vue")
  }
];
const router = new Router({
  mode: "history", // 线上用history模式
  base: "/",
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  routes: constantRouterMap
});
router.beforeEach((to: Route, from: Route, next: any) => {
  // 开始加载进度条
  NProgress.start();
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // 如果前进的页面不是登录页面并且不存在token  则直接进入登录页
  if (to.path !== "/login" && to.path !== "*" && !window.sessionStorage.getItem("token")) {
    location.href = "/login";
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});

// 解决history模式路由跳转自身出现的错误
// 获取原型对象上的push函数
const originalPush = Router.prototype.push;
//修改原型对象中的push方法
Router.prototype.push = function push(location: any) {
  // @ts-ignore
  return originalPush.call(this, location).catch((err: any) => err);
};
export default router;
