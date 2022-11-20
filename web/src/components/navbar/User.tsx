import { defineComponent } from "vue";
import style from "./User.module.scss";
import { NButton, useMessage } from "naive-ui";
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/user";

export const User = defineComponent({
  setup() {
    const message = useMessage();
    const router = useRouter();
    const userStore = useUserStore();
    const loginBtnOnClick = () => {
      router.push({ name: "login" });
    };
    const logoutBtnOnClick = () => {
      userStore.logout();
      router.push({ name: "login" });
      message.info("退出登录成功");
    };
    const adminBtnOnClick = () => {
      router.push({ name: "admin" });
    };
    return () => (
      <div class={style.user}>
        {userStore.id ? (
          <>
            <span>{userStore.username}</span>
            {userStore.superAdmin || userStore.admin ? (
              <NButton class={style.btn} text onClick={adminBtnOnClick}>
                管理后台
              </NButton>
            ) : null}
            <NButton class={style.btn} text onClick={logoutBtnOnClick}>
              注销
            </NButton>
          </>
        ) : (
          <NButton text onClick={loginBtnOnClick}>
            登录
          </NButton>
        )}
      </div>
    );
  },
});
