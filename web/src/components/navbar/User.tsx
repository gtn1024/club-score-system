import { defineComponent } from "vue";
import style from "./User.module.scss";
import { NButton } from "naive-ui";
import { useRouter } from "vue-router";

export const User = defineComponent({
  setup() {
    const router = useRouter();
    const loginBtnOnClick = () => {
      router.push("/login");
    };
    return () => (
      <div class={style.user}>
        <NButton text onClick={loginBtnOnClick}>
          登录
        </NButton>
      </div>
    );
  },
});
