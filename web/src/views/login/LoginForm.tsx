import { computed, defineComponent, ref } from "vue";
import { FormInst, FormRules, NButton, NForm, NFormItem, NInput, useMessage, useNotification } from "naive-ui";
import style from "./Login.module.scss";
import { useRouter } from "vue-router";
import { LoginParams, useUserStore } from "../../store/user";

export const LoginForm = defineComponent({
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const message = useMessage();
    const notification = useNotification();
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
          userStore
            .login(formValue.value)
            .then(() => {
              setTimeout(() => {
                notification.success({
                  title: "登录成功",
                  content: `欢迎回来，${computed(() => userStore.userInfo.realName).value}`,
                  duration: 2000,
                });
              }, 100);
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
          <NFormItem>
            <NButton class={style.btn_login} type="info" onClick={onSubmit}>
              登录
            </NButton>
          </NFormItem>
        </NForm>
      </>
    );
  },
});
