import { redirectMake } from "../tools";
import Layout from "@/views/layout/Layout.vue";

const groupId = "03"; // 大id
const groupMid = "2"; // 菜单模块的标识

/* 用户模块的路由 */
export default [
  redirectMake("/system_manage", "/system_manage/index"),
  {
    path: "/system_manage",
    component: Layout,
    meta: {
      title: "系统设置"
    },
    children: [
      {
        meta: {
          groupId,
          groupMid,
          title: "系统设置"
        },
        path: "index", // 欢迎页
        component: () => import("@/views/system-manage/index.vue")
      },
      {
        meta: {
          groupId,
          groupMid,
          title: "人员配置"
        },
        path: "personnel/index", // 欢迎页
        name: "人员配置",
        component: () => import("@/views/system-manage/personnel/index.vue")
      }
    ]
  }
];
