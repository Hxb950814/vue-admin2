import { redirectMake } from "../tools";
import Layout from "@/views/layout/Layout.vue";

const groupId = "01"; // 大id
const groupMid = "0"; // 菜单模块的标识 [用于激活]

/* 首页模块的路由 */
export default [
  redirectMake("/", "/home_manage/index"),
  {
    path: "/home_manage",
    component: Layout,
    meta: {
      title: "首页"
    },
    children: [
      {
        meta: {
          groupId,
          groupMid,
          title: "首页"
        },
        path: "index", // 欢迎页
        component: () => import("@/views/home-manage/index.vue")
      }
    ]
  }
];
