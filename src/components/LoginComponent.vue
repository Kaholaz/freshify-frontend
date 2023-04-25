<template>
  <el-card class="login-container">
    <h2 class="my-3">Log in</h2>

    <!-- Form -->
    <el-form ref="form" label-position="top" :model="data" class="login-form">
      <!-- Email input -->
      <el-form-item label="Email" prop="email">
        <el-input placeholder="Email" type="text" v-model="data.email" size="large" />
      </el-form-item>

      <!-- Password input -->
      <el-form-item class="password-form-item" label="Password" prop="password">
        <el-input type="password" v-model="data.password" placeholder="Password" size="large" />
      </el-form-item>

      <!-- Ingen konto? -->
      <p class="no-account">
        Har du ikke konto?
        <el-link type="primary" @click="router.push({ name: 'register' })">Regisrer deg! </el-link>
      </p>

      <!-- Sign in-->
      <el-button ref="submitButton" type="primary" size="large" class="w-full" @click="signIn"
        >Sign in
      </el-button>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

import type { LoginUser } from "@/services/index";
import { AccountApi, HouseholdApi } from "@/services/index";
import { useSessionStore } from "@/stores/session";
import { showError } from "@/utils/error-utils";
import router from "@/router";
import { useHouseholdStore } from "@/stores/household";

// Define APIs
const accountApi = new AccountApi();
const householdApi = new HouseholdApi();

// Define stores
const sessionStore = useSessionStore();
const householdStore = useHouseholdStore();

// Define refs
const submitButton = ref<HTMLElement | null>(null);

const data: LoginUser = reactive({
  email: "",
  password: "",
});

// Define callbacks
function signIn() {
  accountApi
    .loginUser(data)
    .then((response) => response.data)
    .then((data) => {
      sessionStore.authenticate(data);

      // Get household the first household
      householdApi
        .getHouseholds(data.id!)
        .then((response) => response.data)
        .then((households) => {
          householdStore.setHousehold(households[0]);
          router.push({ name: "home" });
        });
    })
    .catch((error) => {
      showError("Kunne ikke logge inn.", error.message, 0);
    });
}
</script>

<style scoped>
.login-container {
  width: 90%;
  margin: 10vh auto;
  max-width: 500px;
}

.login-form {
  flex-direction: column;
}

.no-account {
  margin: 0;
  text-align: end;
}

.no-account > a {
  margin-left: 5px;
}

.password-form-item {
  margin-bottom: 0;
}
</style>
