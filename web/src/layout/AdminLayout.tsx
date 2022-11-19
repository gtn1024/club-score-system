import { NLayout, NLayoutSider } from "naive-ui";
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { AdminMenu } from "./components/AdminMenu";

export const AdminLayout = defineComponent({
  setup() {
    return () => (
      <>
        <NLayout has-sider position="absolute" style="top: 64px; bottom: 64px">
          <NLayoutSider bordered>
            <AdminMenu />
          </NLayoutSider>
          <NLayout content-style="padding: 24px;">
            <RouterView />
          </NLayout>
        </NLayout>
      </>
    );
  },
});
