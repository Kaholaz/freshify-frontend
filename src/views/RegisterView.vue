<template>
  <RegisterComponent
    v-model:email="user.email"
    v-model:first-name="user.firstName"
    v-model:password="user.password"
    @submit="submit"
    :error-message="errorMessage"
  >
  </RegisterComponent>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import type { CreateUser } from "@/services/index";
import { AccountApi } from "@/services/index";
import { useSessionStore } from "@/stores/session";
import router from "@/router";
import { showError } from "@/utils/error-utils";

const user = reactive({
  email: "",
  password: "",
  firstName: "",
} as CreateUser);

const accountApi = new AccountApi();
const sessionStore = useSessionStore();
const errorMessage = ref<string>("");

function submit() {
  console.log("submitting");
  accountApi
    .createUser(user)
    .then((data) => {
      sessionStore.authenticate(data.data);
      router.push({ name: "home" });
    })
    .catch((error) => {
      if (error.response.status === 409) {
        errorMessage.value = "En bruker med denne eposten eksisterer allerede";
      } else {
        errorMessage.value = "En uventet feil oppstod";
      }
      setTimeout(() => {
        errorMessage.value = "";
      }, 5000);
    });
}
</script>
