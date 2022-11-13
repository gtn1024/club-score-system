import { defineComponent } from "vue";
import { NGi, NGrid } from "naive-ui";
import style from "./Navbar.module.scss";
import { Logo } from "./Logo";

export const Navbar = defineComponent({
  setup() {
    return () => (
      <nav class={style.navbar}>
        <NGrid cols={6}>
          <NGi span={1}>
            <Logo />
          </NGi>
          <NGi span={4}>
            <div>menu</div>
          </NGi>
          <NGi span={1}>
            <div>user</div>
          </NGi>
        </NGrid>
      </nav>
    );
  },
});
