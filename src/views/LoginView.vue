<template>
  <el-card class="container">
    <h2>Log in</h2>

    <el-form ref="form" :model="data" class="login-form" label-position="top">
      <el-form-item label="Email" prop="email">
        <el-input
          id="email-input"
          v-if="data"
          v-model="data.email"
          placeholder="eksempel@gmail.com"
          size="large"
          type="text"
          @input="errorMessage = ''"
        />
      </el-form-item>

      <el-form-item label="Password" prop="password">
        <el-input
          id="password-input"
          v-if="data"
          v-model="data.password"
          placeholder="passord"
          size="large"
          type="password"
          @input="errorMessage = ''"
          @keyup.enter="signIn"
        />
      </el-form-item>

      <p class="no-account">
        Har du ikke konto?
        <el-link type="primary" @click="router.push({ name: 'register' })">Registrer deg!</el-link>
      </p>

      <el-button ref="submitButton" type="primary" size="large" @click="(vitest) => signIn(vitest)"
        >Logg inn
      </el-button>
      <el-alert
        v-if="errorMessage"
        id="error-box"
        :title="errorMessage"
        closable
        show-icon
        style="margin-top: 1rem"
        type="error"
      >
      </el-alert>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

import type { LoginUser } from "@/services/index";
import { AccountApi, HouseholdApi } from "@/services/index";
import { useSessionStore } from "@/stores/session";
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

const errorMessage = ref<string>("");

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
          if (households?.length > 0) {
            householdStore.household = households[0];
          }
          router.push({ name: "inventory" });
        });
    })
    .catch((error) => {
      if (error.response.status === 401) {
        errorMessage.value = "Feil brukernavn eller passord";
      } else {
        errorMessage.value = "En uventet feil oppstod";
      }
    });
}
</script>

<style scoped>
.container {
  width: 90%;
  margin: 10vh auto;
  max-width: 500px;
}

.login-form {
  flex-direction: column;
}

.no-account {
  text-align: end;
}
</style>
