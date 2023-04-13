import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Welcome from "../views/Welcome.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: Welcome,
    meta: { requiresAuth: true }, // 添加meta属性表示需要验证登录
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

