import { defineComponent, ref } from "vue";
import { FormInst, FormRules, NButton, NForm, NFormItem, NInput, useMessage } from "naive-ui";
import style from "./Login.module.scss";
import { http } from "../../shared/Http";
import { setToken } from "../../shared/token";
import { useRouter } from "vue-router";

type LoginParams = {
  username: string;
  password: string;
};

type LoginResult = {
  token: string;
};

export const Login = defineComponent({
  setup() {
    const router = useRouter();
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
      rForm.value?.validate((errors) => {
        if (!errors) {
          http
            .post<LoginResult>("/auth/login", formValue.value)
            .then((res) => {
              const data = res.data.data;
              const token = data.token;
              setToken(token);
              message.success("登录成功！");
              router.push("/");
            })
            .catch((err) => {
              message.error(err.response.data.message);
            });
        }
      });
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
