import { redirectMake } from "../tools";
import Layout from "@/views/layout/Layout.vue";

const groupId = "04"; // 大id
const groupMid = "3"; // 菜单模块的标识

/* 用户模块的路由 */
export default [
  redirectMake("/data_manage", "/data_manage/index"),
  {
    path: "/data_manage",
    component: Layout,
    meta: {
      title: "数据报表"
    },
    children: [
      {
        meta: {
          groupId,
          groupMid,
          title: "数据报表"
        },
        path: "index", // 欢迎页
        component: () => import("@/views/data-manage/index.vue")
      }
    ]
  }
];
