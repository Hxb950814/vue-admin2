<template>
  <div class="sub-welcome-page">
    <img
      src="//rs.tanxingk.com/images/operate_index.png"
      alt=""
      class="show-pic"
    />
    <p class="text">
      欢迎进入数据报表模块
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { HomeModule } from "@/store/modules/user/home";

@Component({
  components: {}
})
export default class Login extends Vue {
  mounted() {}
}
</script>
