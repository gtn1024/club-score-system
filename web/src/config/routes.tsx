import { RouteRecordRaw } from "vue-router";
import { AdminLayout } from "../layout/AdminLayout";
import { Home } from "../views/admin/Home";
import { Team } from "../views/admin/Team";
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
  {
    path: "/admin",
    name: "admin",
    component: AdminLayout,
    redirect: { name: "admin-home" },
    children: [
      {
        path: "home",
        name: "admin-home",
        component: Home,
      },
      {
        path: "team",
        name: "admin-team",
        component: Team,
      },
    ],
  },
];
