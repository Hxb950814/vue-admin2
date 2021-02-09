import Vue, { DirectiveOptions, VNode } from "vue";
import App from "./App.vue";
import "@/utils/directive";
import * as filters from "@/utils/filter";
import router from "./router";
import store from "./store";
import "./elementUi/index.js";
import "@/assets/styles/index.scss";
// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as any)[key]); //插入过滤器名和对应方法
});
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
