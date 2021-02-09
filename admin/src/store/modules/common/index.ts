import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";

@Module({ name: "Common", dynamic: true, namespaced: true, store })
export default class Common extends VuexModule {
}

export const CommonModule = getModule(Common);
