import { FormInst, FormRules, NButton, NForm, NFormItem, NInput, useMessage } from "naive-ui";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { http } from "../../shared/Http";
import { Model } from "../../shared/types/models";

type TeamCreateParams = {
  name: string;
};

export const TeamCreateForm = defineComponent({
  setup() {
    const message = useMessage();
    const router = useRouter();
    const formValue = ref<TeamCreateParams>({
      name: "",
    });
    const formRef = ref<FormInst | null>(null);
    const rules: FormRules = {
      name: {
        required: true,
        message: "请输入团队名称",
        trigger: "blur",
      },
    };
    const onSubmit = (e: MouseEvent) => {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          http
            .post<Model.Team>("/team", formValue.value)
            .then((res) => {
              message.success("创建成功");
              router.push({ name: "home" });
            })
            .catch((err) => {
              message.error(err.response?.data.message);
            });
        }
      });
    };
    return () => (
      <>
        <NForm
          labelPlacement="left"
          labelWidth="auto"
          rules={rules}
          ref={formRef}
          requireMarkPlacement="right-hanging"
          model={formValue.value}
        >
          <NFormItem label="团队名称" path="name">
            <NInput placeholder="请输入团队名称" v-model={[formValue.value.name, "value"]} />
          </NFormItem>
          <NFormItem>
            <NButton type="info" onClick={onSubmit}>
              创建
            </NButton>
          </NFormItem>
        </NForm>
      </>
    );
  },
});
