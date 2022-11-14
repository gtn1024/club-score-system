import { defineComponent, ref } from "vue";
import { FormInst, FormRules, NButton, NForm, NFormItem, NInput, useMessage } from "naive-ui";
import style from "./Login.module.scss";

type LoginParams = {
  username: string;
  password: string;
};

export const Login = defineComponent({
  setup() {
    const message = useMessage();
    const rForm = ref<FormInst | null>(null);
    const formValue = ref<LoginParams>({
      username: "",
      password: "",
    });
    const rules: FormRules = {
      username: {
        required: true,
        message: "请输入用户名",
        trigger: "blur",
      },
      password: {
        required: true,
        message: "请输入密码",
        trigger: "blur",
      },
    };
    const onSubmit = (e: MouseEvent) => {
      e.preventDefault();
      message.success(`登录被点击，账号：${formValue.value.username}，密码：${formValue.value.password}`);
    };
    return () => (
      <div class={style.container}>
        <div class={style.content}>
          <div class={style.login_form_wrapper}>
            <h3>登录</h3>
            <NForm
              labelPlacement="left"
              labelWidth="auto"
              requireMarkPlacement="right-hanging"
              ref={rForm}
              model={formValue.value}
              rules={rules}
            >
              <NFormItem label="用户名" path="username">
                <NInput v-model={[formValue.value.username, "value"]} placeholder="请输入用户名" />
              </NFormItem>
              <NFormItem label="密码" path="password">
                <NInput v-model={[formValue.value.password, "value"]} type="password" placeholder="请输入密码" />
              </NFormItem>
              <NFormItem>
                <NButton class={style.btn_login} type="info" onClick={onSubmit}>
                  登录
                </NButton>
              </NFormItem>
            </NForm>
          </div>
        </div>
      </div>
    );
  },
});
