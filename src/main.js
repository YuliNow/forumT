/*
 * @author: DoubleW
 * @create: 2021-06-22 10:38 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-06-22 14:18 PM
 * @desc:
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import "@/assets/icon/iconfont.css";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
