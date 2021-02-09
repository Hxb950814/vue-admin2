import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { showToast } from "@/utils/ui";
import request from "@/utils/request";
const root = "/ldos";

@Module({ name: "Login", dynamic: true, namespaced: true, store })
export default class Login extends VuexModule {
  public userInfo = {}; // 用户信息
  public permissionList: any[] = [
    "01",
    "0101",
    "02",
    "0201",
    "0202",
    "0203",
    "03",
    "0301",
    "0302",
    "04"
  ]; // 权限列表

  get getUserInfo() {
    const obj = JSON.parse(<string>localStorage.getItem("vuexData")) || {};
    return obj["info"]?.userInfo;
  }

  @Mutation
  private SET_USERINFO(userInfo: any) {
    this.userInfo = userInfo;
  }

  @Action
  public setUserInfo(data: any) {
    this.SET_USERINFO(data);
  }

  @Action
  public async goLogin(data: any) {
    // 登录平台账号
    const result = await request.postAsync(`${root}/login`, data, {
      paramType: "json"
    });
    return new Promise((resolve: any, reject: any) => {
      if (Number(result[1]?.code) === 200) {
        // 登录成功设置网站的主要信息
        this.setUserInfo(result[1]?.data.userVo);
        window.sessionStorage.setItem("token", result[1]?.data.token);
        resolve(result[1]?.data);
      } else {
        showToast((result[1] as any).msg || "");
        reject();
      }
    });
  }
}

export const LoginModule = getModule(Login);
