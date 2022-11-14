import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import LogoPic from "../../assets/logo.svg";
import style from "./Logo.module.scss";

export const Logo = defineComponent({
  setup() {
    const router = useRouter();
    const onClick = () => {
      router.push("/");
    };
    return () => (
      <div class={style.logo} onClick={onClick}>
        <img class={style.pic} src={LogoPic} style="cursor: pointer;" />
        <span style="cursor: pointer;">积分系统</span>
      </div>
    );
  },
});
