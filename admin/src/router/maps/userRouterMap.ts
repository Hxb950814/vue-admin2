/* 用户模块 */
const menuId = "02";
export default {
  id: menuId,
  name: "客户管理",
  defaultLink: "/user_manage",
  children: [
    {
      id: "02",
      name: "客户管理",
      href: "",
      icon: "jingjiren_kehuguanli",
      children: [
        {
          id: "0201",
          name: "跟进待办",
          href: "/user_manage/all/list"
        },
        {
          id: "0202",
          name: "线索管理",
          href: "/user_manage/manage/list"
        },
        {
          id: "0203",
          name: "线索记录",
          href: "/user_manage/user/index"
        }
      ]
    }
  ]
};
