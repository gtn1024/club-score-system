import { computed, defineComponent, ref } from "vue";
import { User } from "../shared/api/user";
import { http } from "../shared/Http";
import { UserState, useUserStore } from "../store/user";

export const Welcome = defineComponent({
  setup() {
    const userStore = useUserStore();
    const realName = computed(() => userStore.realName);
    return () => <>Hello {realName.value ? realName.value : "World"}</>;
  },
});
