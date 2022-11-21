import { RouteRecordRaw } from "vue-router";
import { AdminLayout } from "../layout/AdminLayout";
import { Home as AdminHome } from "../views/admin/Home";
import { Team as AdminTeam } from "../views/admin/Team";
import { Login } from "../views/login/Login";
import { Home } from "../views/Home";
import { AdminUser } from "../views/admin/AdminUser";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Home,
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
        component: AdminHome,
      },
      {
        path: "team",
        name: "admin-team",
        component: AdminTeam,
      },
      {
        path: "user",
        name: "admin-user",
        component: AdminUser,
      },
    ],
  },
];
