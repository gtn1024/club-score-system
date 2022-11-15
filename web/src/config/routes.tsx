import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Welcome"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login"),
  },
];
