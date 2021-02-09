<template>
  <div class="sub-welcome-page">
    <img
      src="//rs.tanxingk.com/images/operate_index.png"
      alt=""
      class="show-pic"
    />
    <p class="text">
      欢迎进入首页
    </p>
    <span>{{ price | money }}</span>
    <el-button v-permission="'0101'">判断权限</el-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { HomeModule } from "@/store/modules/user/home";
import config from "@/utils/config.ts";
import dayjs from "dayjs";
@Component({
  components: {}
})
export default class extends Vue {
  seat = "666";
  price = 2.222;
  phone = "15235885886";

  mounted() {
    // this.getData();
    // this.initPage();
  }

  getData() {
    const requestData = {
      ClientTime: "2021-02-02 16:30",
      DeviceNo: "BCAB0796"
    };
    HomeModule.getWordFn(requestData);
  }

  initPage() {
    if ([config.seat1, config.seat2, config.seat3].includes(this.seat)) {
      (this as any).$message({
        type: "success",
        message: "坐席以存在"
      });
    } else {
      (this as any).$message({
        type: "warning",
        message: "坐席暂未绑定"
      });
    }
  }
}
</script>
