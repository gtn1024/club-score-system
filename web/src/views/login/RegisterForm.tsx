import { defineComponent, ref } from "vue";
import { FormInst, FormItemRule, FormRules, NButton, NForm, NFormItem, NInput, useMessage } from "naive-ui";
import style from "./Login.module.scss";
import { useRouter } from "vue-router";
import { http } from "../../shared/Http";
import { Model } from "../../shared/types/models";

type RegisterParams = {
  username: string;
  password: string;
  password2: string;
  realName: string;
};

export const RegisterForm = defineComponent({
  setup() {
    const router = useRouter();
    const message = useMessage();
    const rForm = ref<FormInst | null>(null);
    const formValue = ref<RegisterParams>({
      username: "",
      password: "",
      password2: "",
      realName: "",
    });
    const validatePasswordSame = (rule: FormItemRule, value: string): boolean => {
      return value === formValue.value.password;
    };
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
      password2: [
        {
          required: true,
          message: "请输入确认密码",
          trigger: "blur",
        },
        {
          validator: validatePasswordSame,
          message: "两次密码不一致",
          trigger: ["blur", "input"],
        },
      ],
      realName: {
        required: true,
        message: "请输入真实姓名",
        trigger: "blur",
      },
    };

    const onSubmit = (e: MouseEvent) => {
      e.preventDefault();
      rForm.value?.validate((errors) => {
        if (!errors) {
          http
            .post<Model.User>("/user", formValue.value)
            .then(() => {
              message.success("注册成功");
              router.push("/");
            })
            .catch((err) => {
              message.error(err.response.data.message);
            });
        }
      });
    };
    return () => (
      <>
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
          <NFormItem label="确认密码" path="password2">
            <NInput v-model={[formValue.value.password2, "value"]} type="password" placeholder="请输入密码" />
          </NFormItem>
          <NFormItem label="真实姓名" path="realName">
            <NInput v-model={[formValue.value.realName, "value"]} placeholder="请输入真实姓名" />
          </NFormItem>
          <NFormItem>
            <NButton class={style.btn_login} type="info" onClick={onSubmit}>
              注册
            </NButton>
          </NFormItem>
        </NForm>
      </>
    );
  },
});
