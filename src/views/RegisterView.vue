<template>
  <RegisterComponent
    v-model:email="user.email"
    v-model:first-name="user.firstName"
    v-model:password="user.password"
    @submit="submit"
  ></RegisterComponent>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import type { CreateUser } from "@/services/index";
import { AccountApi } from "@/services/index";
import { useSessionStore } from "@/stores/session";
import router from "@/router";
import { showError } from "@/utils/error-utils";

const user = reactive({
  email: "",
  password: "",
  passwordConfirm: "",
  firstName: "",
} as CreateUser);

const accountApi = new AccountApi();
const sessionStore = useSessionStore();

function submit() {
  console.log("submitting");
  accountApi
    .createUser(user)
    .then((data) => {
      sessionStore.authenticate(data.data);
      router.push({ name: "home" });
    })
    .catch((error) => {
      showError("Kunne ikke opprette bruker", error.message, 0);
    });
}
</script>
