/* 通用的列表数据mixin */
import { Component, Vue } from "vue-property-decorator";
import MyPagination from "@/components/MyPagination/MyPagination.vue";
import { checkPermission, checkPermissionNotExist } from "@/utils/helper";

@Component({
  components: {
    MyPagination
  }
})
export default class extends Vue {
  protected tableData = {
    count: 0, // 数据总数
    pageSize: 10, // 默认10
    currentPage: 1, // 当前页面编号，默认第一页面
    data: [] as any[] // 数据数组
  };

  /* 检查含有权限 */
  protected checkPermission(permissionStr: string) {
    return checkPermission(permissionStr);
  }

  /* 检查含有权限 */
  protected checkPermissionNotExist(permissionStr: string) {
    return checkPermissionNotExist(permissionStr);
  }
}
