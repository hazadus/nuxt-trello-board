import { defineStore } from "pinia";
import type { IAuthToken, ILoginCredentials, IUser } from "@/types";
import useToast from "./useToast";

interface StateShape {
  token: string;
  user: IUser | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore("auth-store", {
  state: (): StateShape => ({
    token: "",
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    initializeStore() {
      if (localStorage.getItem("nuxt-trello-board-token")) {
        this.token = localStorage.getItem("nuxt-trello-board-token") || "";
        this.isAuthenticated = true;
      } else {
        this.token = "";
        this.isAuthenticated = false;
      }

      const userInfo = localStorage.getItem("nuxt-trello-board-user");
      if (userInfo) {
        this.user = JSON.parse(userInfo);
      } else {
        localStorage.setItem("nuxt-trello-board-user", JSON.stringify(this.user));
      }
    },
    async signUpAndLogin(loginCredentials: ILoginCredentials) {
      try {
        let data = await $fetch<IUser>("/api/users", {
          method: "POST",
          body: loginCredentials,
        });
        useToast().success(`Учётная запись "${data.email}" успешно создана!`);
        await this.logIn(loginCredentials);
      } catch (e: any) {
        useToast().error(`Ошибка при создании учётной записи: ${e.data.message}`);
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
        this.isAuthenticated = true;
        localStorage.setItem("nuxt-trello-board-token", this.token);
        localStorage.setItem("nuxt-trello-board-user", JSON.stringify(this.user));
        useToast().success(`Вы вошли с учётной записью "${this.user.email}"!`);
      } catch (e: any) {
        useToast().error(`Ошибка при входе в учётную запись: ${e.data.message}`);
      }
    },
    async logOut() {
      try {
        await fetchApi("/users/logout");
        this.token = "";
        this.user = null;
        this.isAuthenticated = false;
        localStorage.setItem("nuxt-trello-board-token", this.token);
        localStorage.setItem("nuxt-trello-board-user", JSON.stringify(this.user));
        useToast().success(`Вы успешно вышли из учётной записи.`);
      } catch (e: any) {
        useToast().error(`Ошибка при выходе из учётной записи: ${e.data.message}`);
      }
    },
  },
});
