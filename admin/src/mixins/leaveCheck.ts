/* 退出前的检查数据保存情况 */
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class extends Vue {
  protected editDataSnapshot = ""; // 保存的数据
  protected hasInvokeKeepFunc = false; // 保存的数据

  /* 设置保存数据 */
  protected setDataKeep(data: any) {
    if (typeof data !== "object") {
      console.error("setDataKeep函数参数为一个对象，不能为空,当前参数:", data);
    }
    setTimeout(() => {
      this.editDataSnapshot = JSON.stringify(data);
      this.hasInvokeKeepFunc = true;
    }, 0);
  }

  /* 检查保存的数据 保存后直接返回 */
  protected checkSaveDataBack(data: any) {
    if (!this.hasInvokeKeepFunc) {
      console.error("执行函数钱请先调用setDataKeep");
      return;
    }
    this.safeExit(data);
  }

  protected safeExit(data: any) {
    if (typeof data !== "object") {
      console.error("setDataKeep函数参数为一个对象，不能为空,当前参数:", data);
    }
    const editDataNewSnapshot = JSON.stringify(data);
    if (
      this.editDataSnapshot === "" ||
      editDataNewSnapshot === this.editDataSnapshot
    ) {
      this.$router.back();
      return;
    }
    // @ts-ignore
    this.$showMessageBox("内容未保存，是否关闭?")
      .then(() => {
        this.$router.back();
      })
      .catch(() => {});
  }
}
