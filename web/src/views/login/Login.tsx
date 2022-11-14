import { defineComponent } from "vue";
import { NButton, NForm, NFormItem, NInput } from "naive-ui";
import style from "./Login.module.scss";

export const Login = defineComponent({
  setup() {
    return () => (
      <div class={style.container}>
        <div class={style.content}>
          <div class={style.login_form_wrapper}>
            <h3>登录</h3>
            <NForm labelPlacement="left" labelWidth="auto" requireMarkPlacement="right-hanging">
              <NFormItem label="用户名" path="username">
                <NInput />
              </NFormItem>
              <NFormItem label="密码" path="password">
                <NInput type="password" />
              </NFormItem>
              <NButton class={style.btn_login} type="info">
                登录
              </NButton>
            </NForm>
          </div>
        </div>
      </div>
    );
  },
});
