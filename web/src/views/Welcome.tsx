import { defineComponent, ref } from "vue";
import { User } from "../shared/api/user";
import { http } from "../shared/Http";

export const Welcome = defineComponent({
  setup() {
    const u = ref<string | null>(null);
    http.get<User>("/auth/current").then((res) => {
      const user = res.data.data;
      u.value = user.realName;
    });
    return () => <>Hello {u.value ? u.value : "World"}</>;
  },
});
