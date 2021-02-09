import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import request from "@/utils/request";

@Module({ name: "Home", dynamic: true, namespaced: true, store })
export default class Home extends VuexModule {
  public token = "";
  public name = "";

  get getToken() {
    const obj = JSON.parse(<string>localStorage.getItem("vuexData")) || {};
    return obj["Home"]?.token;
  }

  get getName() {
    const obj = JSON.parse(<string>localStorage.getItem("vuexData")) || {};
    return obj["Home"]?.name;
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name;
  }

  @Mutation
  private REMOVE_TOKEN(token: string) {
    this.token = token;
  }

  @Action
  public setToken(data: any) {
    this.SET_TOKEN(data);
  }

  @Action
  public setName(data: any) {
    this.SET_NAME(data);
  }

  @Action
  public removeToken() {
    this.REMOVE_TOKEN("");
  }

  @Action
  public async getWordFn(data: any) {
    const result = await request.getAsync("home/pdf", data, { paramType: "json" });
    console.log(result);
    // return new Promise((resolve:any, reject:any) => {
    //   request.get('')
    // })
  }
}

export const HomeModule = getModule(Home);
