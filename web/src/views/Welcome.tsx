import { defineComponent, ref } from "vue";
import { User } from "../shared/api/user";
import { http } from "../shared/Http";

type CurrentUserResult = {
  user: User;
};

export const Welcome = defineComponent({
  setup() {
    const u = ref<string | null>(null);
    http.get<CurrentUserResult>("/auth/current").then((res) => {
      const user = res.data.data.user;
      u.value = user.realName;
    });
    return () => <>Hello {u.value ? u.value : "World"}</>;
  },
});
