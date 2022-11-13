import { defineComponent } from "vue";
import style from "./Footer.module.scss";
import { NButton } from "naive-ui";

export const Footer = defineComponent({
  setup() {
    return () => <div class={style.footer}>&copy; 2013-2022 NYTDC-SASTIT</div>;
  },
});
