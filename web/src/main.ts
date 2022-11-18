import { createApp } from "vue";
import "./style.css";
import { App } from "./App";
import { createRouter } from "vue-router";
import { history } from "./shared/history";
import { routes } from "./config/routes";
import { createPinia } from "pinia";

import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import { setupUserInfoGuard } from "./config/guard/userLoginInfo";

const router = createRouter({ history, routes });
setupUserInfoGuard(router);
const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
