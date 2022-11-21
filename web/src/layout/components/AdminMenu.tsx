import { NMenu } from "naive-ui";
import { MenuMixedOption } from "naive-ui/es/menu/src/interface";
import { computed, defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "../../store/user";

export const AdminMenu = defineComponent({
  setup() {
    const userStore = useUserStore();
    const isSuperAdmin = computed(() => userStore.superAdmin);
    const isAdmin = computed(() => userStore.admin);
    const menuOptions = computed(() => {
      return [
        {
          label: () => <RouterLink to={{ name: "admin-team" }}>团队管理</RouterLink>,
          key: "go-to-team",
          show: isAdmin.value || isSuperAdmin.value,
        },
        {
          label: () => <RouterLink to={{ name: "admin-user" }}>用户管理</RouterLink>,
          key: "go-to-user",
          show: isAdmin.value || isSuperAdmin.value,
        },
      ] as MenuMixedOption[];
    });
    return () => (
      <>
        <NMenu options={menuOptions.value} />
      </>
    );
  },
});
