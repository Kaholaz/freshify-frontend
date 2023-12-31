import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { UserFull } from "@/services/index";
import { AccountApi } from "@/services/apis/account-api";
import router from "@/router";

export const useSessionStore = defineStore("sessionStore", () => {
  const user = ref(null as UserFull | null);
  const EXPIRY_TIME = 1 * 10 * 1000 * 60;
  const accountApi = new AccountApi();
  let id = 0 as number;

  const isAuthenticated = computed(() => {
    getUser();
    return user.value != null;
  });

  function getUser() {
    const userFromStorage = sessionStorage.getItem("user");
    if (user.value != null) {
      return user.value;
    }
    if (userFromStorage != null) {
      user.value = JSON.parse(userFromStorage);
      return <UserFull>user.value;
    }
  }

  function refreshNotification() {
    if (!isAuthenticated.value) {
      return;
    }
    if (id !== null) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      if (confirm("Er du der? Trykk ok for å ikke bli logget ut om et minutt")) {
        accountApi
          .getUserById(user.value!.id)
          .then(() => {
            refreshNotification();
          })
          .catch(() => {
            timeout();
            router.push("/login");
          });
        return;
      } else {
        logOut();
      }
    }, EXPIRY_TIME);
  }

  function authenticate(authentication: UserFull) {
    user.value = authentication;
    localStorage.setItem("user", JSON.stringify(authentication));
    refreshNotification();
  }

  function timeout() {
    localStorage.removeItem("user");
    clearTimeout(id);
    user.value = null;
  }

  function logOut() {
    accountApi
      .logoutUser()
      .then(() => {
        timeout();
        router.push("/");
      })
      .catch(() => {
        alert("Det oppstod en feil under utlogging. Vennligst prøv igjen senere.");
      });
  }

  function getHighestRole() {
    return user.value!.admin ? "ADMIN" : "USER";
  }

  return {
    isAuthenticated,
    getHighestRole,
    timeout,
    getUser,
    authenticate,
    logOut,
    refreshNotification,
  };
});
