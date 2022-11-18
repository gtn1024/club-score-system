import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { User } from "../shared/api/user";
import { http } from "../shared/Http";
import { clearToken, setToken } from "../shared/token";

export type UserState = {
  id?: number;
  username?: string;
  realName?: string;
  // teams?: Team[];
  superAdmin?: boolean;
  admin?: boolean;
};

export type LoginParams = {
  username: string;
  password: string;
};

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    id: undefined,
    username: undefined,
    realName: undefined,
    // teams: undefined,
    superAdmin: undefined,
    admin: undefined,
  }),
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },
  actions: {
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    resetInfo() {
      this.$reset();
    },
    logoutCallBack() {
      this.resetInfo();
      clearToken();
    },
    logout() {
      this.logoutCallBack();
    },
    async login(request: LoginParams) {
      await http
        .post<string>("/auth/login", request)
        .then(async (res) => {
          const token = res.data.data;
          setToken(token);
        })
        .catch((err) => {
          clearToken();
          throw err;
        });
    },
    async info() {
      await http
        .get<User>("/auth/current")
        .then((res) => {
          const data = res.data.data;
          this.setInfo(data);
        })
        .catch((err) => {
          clearToken();
          throw err;
        });
    },
  },
});
