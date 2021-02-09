/* 用户模块 */
export default {
  id: "01",
  name: "首页",
  defaultLink: "/home_manage",
  children: [
    {
      id: "01",
      name: "首页",
      href: "/home_manage/index",
      icon: "home",
      children: [
        {
          id: "0101", // 如果仅有一个前端做占位展示
          href: ""
        }
      ]
    }
  ]
};
