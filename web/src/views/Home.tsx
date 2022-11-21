import { NLayout } from "naive-ui";
import { defineComponent } from "vue";
import { TeamGroup } from "../components/team/TeamGroup";
import { useUserStore } from "../store/user";

export const Home = defineComponent({
  setup() {
    const userStore = useUserStore();
    return () => (
      <NLayout position="absolute" style="top: 64px; bottom: 64px">
        <NLayout content-style="padding: 24px;">
          <div style="padding: 16px">
            {userStore.id ? <TeamGroup title="我加入的" scope="joined" /> : null}
            {userStore.admin || userStore.superAdmin ? <TeamGroup title="我创建的" scope="created" /> : null}
            {userStore.id ? <TeamGroup title="我管理的" scope="managed" /> : null}
            <TeamGroup title="所有团队" scope="all" />
          </div>
        </NLayout>
      </NLayout>
    );
  },
});
