import { defineStore } from "pinia";
import type { IAuthToken, ILoginCredentials, IUser } from "@/types";

interface StateShape {
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore("auth-store", {
  state: (): StateShape => ({
    token: null,
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    initializeStore() {
      if (localStorage.getItem("nuxt-trello-board-token")) {
        this.token = localStorage.getItem("nuxt-trello-board-token");
        this.isAuthenticated = true;
      } else {
        this.token = null;
        this.isAuthenticated = false;
      }

      const userInfo = localStorage.getItem("nuxt-trello-board-user");
      if (userInfo) {
        this.user = JSON.parse(userInfo);
      } else {
        localStorage.setItem("nuxt-trello-board-user", JSON.stringify(this.user));
      }
    },
    async logIn(loginCredentials: ILoginCredentials) {
      try {
        let data = await $fetch<IAuthToken>("/api/users/login", {
          method: "POST",
          body: loginCredentials,
        });
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem("nuxt-trello-board-token", this.token);
        localStorage.setItem("nuxt-trello-board-user", JSON.stringify(this.user));
        useToast().success(`Logged in as "${this.user.email}"!`);
      } catch (e: any) {
        useToast().error(`Error logging in: ${e.data.message}`);
      }
    },
  },
});
