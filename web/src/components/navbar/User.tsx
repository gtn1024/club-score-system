import { defineComponent } from "vue";
import style from "./User.module.scss";
import { NButton } from "naive-ui";

export const User = defineComponent({
  setup() {
    return () => (
      <div class={style.user}>
        <NButton text>登录</NButton>
      </div>
    );
  },
});
