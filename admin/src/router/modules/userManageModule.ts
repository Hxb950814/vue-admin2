import { redirectMake } from "../tools";
import Layout from "@/views/layout/Layout.vue";

const groupId = "02"; // 大id
const groupMid = "1"; // 菜单模块的标识

/* 用户模块的路由 */
export default [
  redirectMake("/user_manage", "/user_manage/index"),
  {
    path: "/user_manage",
    component: Layout,
    meta: {
      title: "客户管理"
    },
    children: [
      {
        meta: {
          groupId,
          groupMid,
          title: "跟进待办"
        },
        path: "index", // 欢迎页
        component: () => import("@/views/user-manage/index.vue")
      },
      {
        meta: {
          groupId,
          groupMid,
          title: "跟进待办"
        },
        name: "线索管理",
        path: "all/list", // 欢迎页
        component: () => import("@/views/user-manage/all/list.vue")
      },
      {
        meta: {
          groupId,
          groupMid,
          title: "线索管理"
        },
        name: "线索管理",
        path: "manage/list", // 欢迎页
        component: () => import("@/views/user-manage/manage/list.vue")
      },
      {
        meta: {
          groupId,
          groupMid,
          title: "线索记录"
        },
        name: "线索记录",
        path: "user/index", // 欢迎页
        component: () => import("@/views/user-manage/user/index.vue")
      }
    ]
  }
];
