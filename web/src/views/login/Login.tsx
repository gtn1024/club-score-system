import { defineComponent } from "vue";
import { NCard, NTabPane, NTabs } from "naive-ui";
import style from "./Login.module.scss";
import { LoginForm } from "./LoginForm";

export const Login = defineComponent({
  setup() {
    return () => (
      <div class={style.container}>
        <div class={style.content}>
          <NCard style="width: var(--login-container-width);">
            <NTabs defaultValue="login">
              <NTabPane name="login" tab="登录">
                <LoginForm />
              </NTabPane>
              <NTabPane name="register" tab="注册">
              </NTabPane>
            </NTabs>
          </NCard>
        </div>
      </div>
    );
  },
});
