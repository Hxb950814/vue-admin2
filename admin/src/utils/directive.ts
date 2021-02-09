/* 自定义指令 + 自定义过滤器 */
import Vue, { DirectiveOptions, VNode } from "vue";
import { DirectiveBinding } from "vue/types/options";
import { checkPermission } from "@/utils/helper";
/**
 *
 * 自定义指令
 *
 * */
// 页面指定dom元素的权限控制【隐藏展示】
Vue.directive("permission", {
  bind: function(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    if (checkPermission(String(binding.value))) {
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  },
  update: function(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    if (checkPermission(String(binding.value))) {
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  }
});
