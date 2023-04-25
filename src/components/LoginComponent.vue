<template>
  <div class="login-container">
    <el-card shadow="never" class="w-full max-w-md login-card" :body-style="{ padding: 20 }">
      <h2 class="my-3">Log in</h2>
<<<<<<< Updated upstream

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
        Har du ikke konto?<el-link type="primary" @click="router.push({ name: 'register' })"
          >Regisrer deg!</el-link
        >
      </p>

      <!-- Sign in-->
      <el-button ref="submitButton" type="primary" size="large" class="w-full" @click="signIn"
        >Sign in</el-button
      >
    </el-form>
  </div>
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
=======
      <p class="text-[#868e96]">
        Don't have an account?
        <el-link type="primary">Sign up</el-link>
      </p>
    </div>
    <el-form label-position="top">
      <el-form-item label="Email">
        <el-input placeholder="Email" type="text" v-model="state.email" size="large" />
      </el-form-item>
      <el-form-item type="text" v-model="state.password" label="Password">
        <el-input placeholder="Password" size="large" />
      </el-form-item>
      <div class="flex justify-between mb-2">
        <el-checkbox v-model="checked" label="Remember me" size="large" />
        <el-link class="forgot-password" type="primary">Forgot password?</el-link>
      </div>
      <el-button type="primary" size="large" class="w-full">Sign in</el-button>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { required, email } from "@vuelidate/validators";
import useValidate from "@vuelidate/core";

const state = reactive({
  email: "",
  password: {
    password: "",
    confirm: "",
  },
});

const rules = computed(() => {
  return {
    email: { required },
    password: {
      password: { required },
      confirm: { required },
    },
  };
});

const v$ = useValidate(rules, state);
>>>>>>> Stashed changes
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.login-form {
  max-width: 350px;
  width: 80%;
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
