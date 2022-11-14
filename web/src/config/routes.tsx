import { RouteRecordRaw } from "vue-router";
import { Login } from "../views/login/Login";
import { Welcome } from "../views/Welcome";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Welcome,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];
