import { useMessage } from "naive-ui";
import { Router } from "vue-router";
import { getToken } from "../../shared/token";
import { useUserStore } from "../../store/user";

const isLogin = () => {
  return !!getToken();
};

export const setupUserInfoGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    if (to.name === "login") {
      userStore.logout();
    }
    if (isLogin()) {
      if (userStore.id) {
        // 状态库中有用户信息，直接放行
        next();
      } else {
        // 状态库没有用户信息，请求用户信息
        userStore.info().then(() => {
          next();
        });
        next();
      }
    }
    next();
  });
};
