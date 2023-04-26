<template>
  <el-card class="container">
    <h2>Logg inn</h2>

    <el-form ref="form" label-position="top" :model="data" class="login-form">
      <el-form-item label="Epost" prop="email">
        <el-input
          placeholder="Epost"
          type="text"
          v-model="data.email"
          size="large"
          @input="errorMessage = ''"
        />
      </el-form-item>

      <el-form-item label="Passord" prop="password">
        <el-input
          type="password"
          v-model="data.password"
          @input="errorMessage = ''"
          placeholder="Passord"
          size="large"
        />
      </el-form-item>

      <p class="no-account">
        Har du ikke konto?
        <el-link type="primary" @click="router.push({ name: 'register' })">Registrer deg! </el-link>
      </p>

      <el-button ref="submitButton" type="primary" size="large" @click="signIn"
        >Logg inn
      </el-button>
      <el-alert
        type="error"
        v-if="errorMessage"
        show-icon
        closable
        style="margin-top: 1rem"
        :title="errorMessage"
      >
      </el-alert>
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
          console.log(households);
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
