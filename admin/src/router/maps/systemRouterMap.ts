/* 用户模块 */
const menuId = "03";
export default {
  id: menuId,
  name: "系统设置",
  defaultLink: "/system_manage",
  children: [
    {
      id: "03",
      name: "系统设置",
      href: "",
      icon: "shezhi",
      children: [
        {
          id: "0301",
          name: "系统设置",
          href: "/system_manage/index"
        },
        {
          id: "0302",
          name: "人员配置",
          href: "/system_manage/personnel/index"
        }
      ]
    }
  ]
};
