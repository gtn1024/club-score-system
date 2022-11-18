import { computed, defineComponent } from "vue";
import { useUserStore } from "../store/user";

export const Welcome = defineComponent({
  setup() {
    const userStore = useUserStore();
    const realName = computed(() => userStore.realName);
    return () => <>Hello {realName.value ? realName.value : "World"}</>;
  },
});
