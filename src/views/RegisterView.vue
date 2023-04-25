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
import type { CreateUser } from "@/services";

const user = reactive({
  email: "",
  password: "",
  passwordConfirm: "",
  firstName: "",
} as CreateUser);

function submit() {
  console.log(user);
}
</script>
