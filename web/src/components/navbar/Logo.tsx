import { defineComponent } from "vue";
import LogoPic from "../../assets/logo.svg";
import style from "./Logo.module.scss";

export const Logo = defineComponent({
  setup() {
    return () => (
      <div class={style.logo}>
        <img class={style.pic} src={LogoPic} />
        <span>积分系统</span>
      </div>
    );
  },
});
