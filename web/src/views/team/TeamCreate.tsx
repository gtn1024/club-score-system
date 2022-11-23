import { NCard, NH2 } from "naive-ui";
import { defineComponent } from "vue";
import style from "./TeamCreate.module.scss";
import { TeamCreateForm } from "./TeamCreateForm";

export const TeamCreate = defineComponent({
  setup() {
    return () => (
      <div class={style.container}>
        <div class={style.content}>
          <NCard style="width: var(--container-width);">
            <NH2>团队创建</NH2>
            <TeamCreateForm />
          </NCard>
        </div>
      </div>
    );
  },
});
