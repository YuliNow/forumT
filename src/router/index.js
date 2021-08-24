/*
 * @author: LUOCAN
 * @create: 2021-06-21 16:16 PM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-07-01 10:11 AM
 * @desc:
 */
import Vue from "vue";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
/**
 * 按需导入
 * import { Button,Select } from "element-ui"
 * ! 需借助装包 babel-plugin-component 并修改.babelrc配置文件
 */
import "element-ui/lib/theme-chalk/index.css";
import Home from "../views/Home.vue";
import Hotpoint from "../views/Hotpoint.vue";
import ArtDetail from "../views/ArtDetail.vue";
import Edit from "../views/EditEditor.vue";
import Set from "../views/Set.vue";

Vue.use(VueRouter);
/**
 * 可传入两个参数 size zIndex 控制ui组件的尺寸与层级
 * Vue.use(ElementUI,{size:'small',zIndex:3000});
 */
Vue.use(ElementUI);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Hotpoint",
    name: "Hotpoint",
    component: Hotpoint,
  },
  {
    path: "/artDetail",
    name: "ArtDetail",
    component: ArtDetail,
  },
  {
    path: "/edit",
    name: "Edit",
    component: Edit,
  },
  {
    path: "/Set",
    name: "Set",
    component: Set,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let r;
  if (to.path == "/edit" || to.path == "/Set") {
    r = false;
  } else {
    r = true;
  }

  if (!r) {
    if (!localStorage.getItem("user")) {
      alert("当前并未登录!");
      next("/");
    } else {
      console.log(to.path);
      next();
    }
  } else {
    next();
  }
});

export default router;
